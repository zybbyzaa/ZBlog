/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as articlesActions from '../actions/articles'
import * as optionsActions from '../actions/options'
import * as commentActions from '../actions/comments'
import { bindActionCreators } from 'redux'
import ArticleDetailItem from '../components/ArticleDetailItem'
import PreNextNavigation from '../components/PreNextNavigation'
import CommentList from '../components/CommentList'
import CommentEditor from '../components/CommentEditor'
import { ClipLoader } from 'halogen'
import { Link } from 'react-router'

class ArticleDetail extends Component {

    componentDidMount() {
        const id = this.props.params.id

        this.props.actions.getArticleDetail(id)
        this.props.actions.getArticlePreNext(id)
        this.props.commentActions.getCommentList(id,0,false)
    }
    componentWillUpdate(nextProps, nextState) {
        const oldId = this.props.params.id
        const newId = nextProps.params.id

        if (oldId !== newId) {
            this.props.actions.getArticleDetail(newId)
            this.props.actions.getArticlePreNext(newId)
            this.props.commentActions.getCommentList(newId,0,false)
        }
    }
    renderArticle(article,count) {
        let item = ''

        if (count > 0) {
            item = <ArticleDetailItem article={article}></ArticleDetailItem>
        }else {
            item = '对不起，当前没有任何文章'
        }
        return item
    }
    // renderError() {
    //     return (
    //         <p className='error'>{ this.props.articles.error }</p>
    //     )
    // }
    render() {
        const article = this.props.article.items
        const count =this.props.article.items_count
        let content = ''

        if (!this.props.article.isFetching) {
            content = this.renderArticle(article,count)
        }
        return (
          <section className='site-content-main article-detail'>
              <h3 className='site-content-title'>文章详情<Link to="/article" className='return-btn' title='返回文章列表'>-&gt;</Link></h3>
              <div className='site-content-loading'>
                  <ClipLoader size="20px" color="rgba(34,34,34,.5)" loading={this.props.article.isFetching}/>
              </div>
              { content }
              <PreNextNavigation preArticle={this.props.articlePreNext.prev} nextArticle={this.props.articlePreNext.next}></PreNextNavigation>
              <CommentList toggleModal={this.props.optionsActions.toggleLoginModal} comment={this.props.comments} commentActions={this.props.commentActions}></CommentList>
              <CommentEditor toggleModal={this.props.optionsActions.toggleLoginModal} commentActions={this.props.commentActions} aid={this.props.params.id}></CommentEditor>
          </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        article: state.articleDetail.toJS(),
        articlePreNext: state.prenextArticle.toJS(),
        comments: state.comments.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(articlesActions, dispatch),
        optionsActions: bindActionCreators(optionsActions, dispatch),
        commentActions: bindActionCreators(commentActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail)
