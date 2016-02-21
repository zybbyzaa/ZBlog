import React, { Component, PropTypes } from 'react'
import '../assets/less/articleitem.less'
import { Link } from 'react-router'
import moment from 'moment'

moment.locale('zh-cn')
class ArticleItem extends Component {
    render() {
        return (
            <article className="site-article">
                <Link to={'/article/' + this.props.article._id} className="site-article-title">{this.props.article.title}</Link>
                <section className='site-article-meta'>
                    <span><i className='icon-user'></i> {this.props.article.author}</span>
                    <span><i className='icon-calendar'></i> {moment(this.props.article.create_time).fromNow()}</span>
                    <span><i className='icon-comments'></i> 评论:{this.props.article.comments}</span>
                    <span><i className='icon-fire'></i> 浏览:{this.props.article.views}</span>
                </section>
                <p className="site-article-content">
                    {this.props.article.description}
                </p>

            </article>
        )
    }
}
ArticleItem.propTypes = {
    article: PropTypes.object.isRequired
}

export default ArticleItem
