import React, { Component, PropTypes } from 'react'
import { isLogin } from '../utils/authService'

class CommentEditor extends Component {
    handleFocus() {
        this.refs.arrow.className = 'site-content-editor-arrow focus'
    }
    handleBlur() {
        this.refs.arrow.className = 'site-content-editor-arrow'
    }
    submitComment(e) {
        e.preventDefault()
        const { comment } = this.refs
        const commentInfo = {aid: this.props.aid, content: comment.value}

        this.props.commentActions.addComment(commentInfo)

        comment.value = ''
    }
    openModal() {
        this.props.toggleModal(true)
    }
    renderCommentEditor() {
        if(!isLogin()){
            return(
                <div className="site-comment-info">
                    <p>你还没有登录，请<a onClick={this.openModal.bind(this)}>登录</a>后再发表评论</p>
                </div>
            )
        } else {
            let avatarSrc = require('../assets/img/icon.jpg')

            return(
                <form className='newComment' onSubmit={this.submitComment.bind(this)}>
                    <section className='site-comment-editor'>
                        <img src={avatarSrc} alt="avatar" className='site-comment-editor-avatar' width='70px'/>
                        <div className='site-comment-editor-arrow' ref='arrow'></div>
                        <textarea ref="comment" rows="4" className='site-comment-editor-text'
                            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论"
                            onFocus={this.handleFocus.bind(this)}
                            onBlur={this.handleBlur.bind(this)}></textarea>
                        <button className='btn site-comment-editor-button'>发送评论</button>
                    </section>
                </form>
            )
        }
    }
    render() {
        const content = this.renderCommentEditor()

        return (
            <div>{content}</div>
        )
    }
}

export default CommentEditor
