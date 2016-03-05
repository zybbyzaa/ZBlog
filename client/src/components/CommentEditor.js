import React, { Component, PropTypes } from 'react'
//import '../assets/less/commentEditor.less'

class CommentEditor extends Component {
    handleFocus() {
        this.refs.arrow.className = 'site-content-editor-arrow focus'
    }
    handleBlur() {
        this.refs.arrow.className = 'site-content-editor-arrow'
    }
    render() {
        const src = require('../assets/img/icon.jpg')

        return (
            <section className='site-comment-editor'>
                <img src={src} alt="avatar" className='site-comment-editor-avatar' width='70px'/>
                <div className='site-comment-editor-arrow' ref='arrow'></div>
                <textarea ref="comment" rows="4" className='site-comment-editor-text'
                    placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论"
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}></textarea>
                <button value='发送评论' className='btn site-comment-editor-button'>发送评论</button>
            </section>
        )
    }
}

export default CommentEditor
