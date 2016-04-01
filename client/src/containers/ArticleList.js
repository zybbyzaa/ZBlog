/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as articlesActions from '../actions/articles'
import * as optionsActions from '../actions/options'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'halogen'
import ArticleItem from '../components/ArticleItem'
import PageNavigation from '../components/PageNavigation'

class ArticleList extends Component {

    componentDidMount() {
        const pageNum = this.props.params.pageNum
            ? Number(this.props.params.pageNum)
            : 1

        this.props.actions.changePageNum(pageNum)
        this.props.actions.getArticleList()
    }
    componentWillUpdate(nextProps, nextState) {
        const oldPageNum = this.props.params.pageNum
            ? Number(this.props.params.pageNum)
            : 1
        const newPageNum = nextProps.params.pageNum
            ? Number(nextProps.params.pageNum)
            : 1

        if (oldPageNum !== newPageNum) {
            this.props.actions.changePageNum(newPageNum)
            this.props.actions.getArticleList()
        }
    }
    renderArticle(articles, count) {
        let item = ''

        if (count < 1) {
            item = '对不起，当前没有任何文章'

        } else {
            item = articles.map((article, i) => {
                return (
                    <ArticleItem key={i} article={article}></ArticleItem>
                )
            })
        }
        return item
    }
    // renderError() {
    //     return (
    //         <p className='error'>{this.props.articles.error}</p>
    //     )
    // }
    render() {
        const articles = this.props.articles.items
        const count = this.props.articles.items_count
        let content = ''

        return (
            <section className='site-content-main article-list'>
                <h3 className='site-content-title'>文章列表</h3>
                <div className='site-content-loading'>
                    <ClipLoader size="20px" color="rgba(34,34,34,.5)" loading={this.props.articles.isFetching}/>
                </div>
                {
                    this.props.articles.isFetching ? null : this.renderArticle(articles, count)
                }
                <PageNavigation curPage={this.props.options.articleQuery.currentPage} count={count} staPoint='/article' perPage={3}></PageNavigation>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articleList.toJS(),
        options: state.options.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign({}, articlesActions, optionsActions)

    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
