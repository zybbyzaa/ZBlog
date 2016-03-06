/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as articlesActions from '../actions/articles'
import { bindActionCreators } from 'redux'
import ArticleDetailItem from '../components/ArticleDetailItem'
import CommentEditor from '../components/CommentEditor'
import { ClipLoader } from 'halogen'

class ArticleDetail extends Component {

    componentDidMount() {
        const id = this.props.params.id

        this.props.actions.loadArticle(id)
    }
    renderArticle(article) {
        let item = ''

        if (article) {
            item = <ArticleDetailItem article={article}></ArticleDetailItem>
        }else {
            item = '对不起，当前没有任何文章'
        }
        return item
    }
    renderError() {
        return (
            <p className='error'>{ this.props.articles.error }</p>
        )
    }
    render() {
        const article = this.props.articles.article
        let content = ''

        if (!this.props.articles.articles_loading && this.props.articles.error == '') {
            content = this.renderArticle(article)
        } else {
            content = this.renderError()
        }
        return (
          <section className='site-content-main article-detail'>
              <h3 className='site-content-title'>文章详情</h3>
              <div className='site-content-loading'>
                  <ClipLoader size="20px" color="rgba(34,34,34,.5)" loading={this.props.articles.articles_loading}/>
              </div>
              { content }
              <CommentEditor></CommentEditor>
          </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(articlesActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail)
