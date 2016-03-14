import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import markdown from 'markdown-js'

moment.locale('zh-cn')
class ArticleDetailItem extends Component {
    getContent() {
        let content = this.props.article.content ? this.props.article.content : ''

        return {
            __html: markdown.makeHtml(content)
        }
    }
    render() {
        return (
            <article className="site-article">
                <h3 className="site-article-title">{this.props.article.title}</h3>
                <section className='site-article-meta'>
                    <div className='left'>
                        <span><i className='icon-user'></i> {this.props.article.author}</span>
                        <span><i className='icon-calendar'></i> {moment(this.props.article.update_time).fromNow()}</span>
                        <span><i className='icon-tags'></i> 标签:{this.props.article.tags}</span>
                    </div>
                    <div className='right'>
                        <span><i className='icon-comments'></i> 评论:{this.props.article.comments}</span>
                        <span><i className='icon-fire'></i> 浏览:{this.props.article.views}</span>
                    </div>
                </section>
                <div className="site-article-content" dangerouslySetInnerHTML={this.getContent()}>
                </div>
            </article>
        )
    }
}
ArticleDetailItem.propTypes = {
    article: PropTypes.object.isRequired
}

export default ArticleDetailItem
