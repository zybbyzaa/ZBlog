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

class Article extends Component {
    componentDidMount() {
        this.props.actions.load()
    }
    renderArticle(articles) {
        if (articles.length < 1) {
            return (
                <section>对不起，当前没有任何文章</section>
            )
        }
        const item = articles.map((article, i)=>{
            return (
              <section key={ i }>{ article.title }</section>
            )
        })

        return (
              <section>{item}</section>
        )
    }
    renderError() {
        return (
            <section className='load-failed'>{ this.props.articles.error }</section>
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
          <section className='site-article'>
              <ScaleLoader size="20px" color="#666" loading={this.props.articles.articles_loading}/>
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
)(Article)
