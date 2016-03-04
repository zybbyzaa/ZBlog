/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

//import '../assets/less/article.less'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as articlesActions from '../actions/articles'
import { bindActionCreators } from 'redux'
import ArticleDetailItem from '../components/ArticleDetailItem'
import CommentEditor from '../components/CommentEditor'

class ArticleDetail extends Component {
    componentDidMount() {
        const id = this.props.params.id

        this.props.actions.loadArticle(id)
    }
    renderArticle(articles) {
        const item = <ArticleDetailItem article={articles}></ArticleDetailItem>

        return (
              <section className='site-content-main'>
                  {(articles ? item : '对不起，当前没有任何文章')}
                  <CommentEditor></CommentEditor>
              </section>
        )
    }
    renderError() {
        return (
            <section className='site-content-main error'>{ this.props.articles.error }</section>
        )
    }
    render() {
        const articles = this.props.articles.articles
        let content = ''

        if (!this.props.articles.articles_loading && this.props.articles.error == '') {
            content = this.renderArticle(articles)
        } else {
            content = this.renderError()
        }
        return (
          <section className='site-content article-detail'>
              { content }
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
