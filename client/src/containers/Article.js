/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import '../assets/less/article.less'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as articlesActions from '../actions/articles'
import { bindActionCreators } from 'redux'
import { ScaleLoader } from 'halogen'
import ArticleItem from '../components/ArticleItem'

class Article extends Component {
    componentDidMount() {
        console.log(this.props.params.pageNum)
        this.props.actions.load()
    }
    renderArticle(articles) {
        const item = articles.map((article, i)=>{
            return (
                <ArticleItem key={i} article={article}></ArticleItem>
            )
        })

        return (
              <section className='site-content-main'>
                  <h3 className='site-content-title'>最新文章</h3>
                  {(articles.length < 1 ? '对不起，当前没有任何文章' : item)}
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
          <section className='site-content article'>
              <div className='site-content-loading'>
                  <ScaleLoader size="16px" color="#3ceea3" loading={this.props.articles.articles_loading}/>
              </div>
              { content }
              <aside className='site-content-aside'></aside>
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
)(Article)
