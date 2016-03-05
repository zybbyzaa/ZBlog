/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as articlesActions from '../actions/articles'
import * as pageActions from '../actions/page'
import { bindActionCreators } from 'redux'
import { ScaleLoader } from 'halogen'
import ArticleItem from '../components/ArticleItem'
import PageNavigation from '../components/PageNavigation'

class Article extends Component {
    componentDidMount() {
        const pageNum = this.props.params.pageNum ? Number(this.props.params.pageNum) : 1

        this.props.actions.setPageNum(pageNum)
        this.props.actions.load(pageNum)
        console.log('alist')
    }
    renderArticle(articles) {
        let item = ''

        if (articles.length < 1) {
            item = '对不起，当前没有任何文章'

        } else {
            item = articles.map((article, i)=>{
                return (
                    <ArticleItem key={i} article={article}></ArticleItem>
                )
            })
        }
        return item
    }
    renderError() {
        return (
            <p className='error'>{ this.props.articles.error }</p>
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
          <section className='site-content-main article-list'>
              <h3 className='site-content-title'>文章列表</h3>
              <div className='site-content-loading'>
                  <ScaleLoader size="16px" color="#3ceea3" loading={this.props.articles.articles_loading}/>
              </div>
              { content }
              <PageNavigation curPage={this.props.page.currentPage} count={this.props.articles.articles_count} staPoint='/article'></PageNavigation>
          </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles,
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign({}, articlesActions, pageActions)

    console.log(actions)
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)
