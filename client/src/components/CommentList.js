import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { isLogin } from '../utils/authService'

moment.locale('zh-cn')
class CommentList extends Component {

    // openModal() {
    //     this.props.toggleModal(true)
    // }
    showReply(e,i) {
        e.preventDefault()

        if (isLogin()) {
            const eleForm = this.refs['replyForm' + i]
            const eleTextarea = eleForm.getElementsByTagName('textarea')[0]

            if(eleForm.className.indexOf('hidden') != -1){
                eleForm.className = 'newReply'
                eleTextarea.focus()
            }else{
                eleForm.className += ' hidden'
            }
        } else {
            const eleDiv = this.refs['noLogin' + i]

            if(eleDiv.className.indexOf('hidden') != -1){
                eleDiv.className = 'site-comment-info'
            }else{
                eleDiv.className += ' hidden'
            }
        }
    }
    submitReply(e, i, cid) {
        e.preventDefault()

        const eleForm = this.refs['replyForm' + i]
        const content = this.refs['comment' + i].value

        this.props.commentActions.addReply(cid, {content: content})
        this.refs['comment' + i].value = ''
        eleForm.className += ' hidden'
    }
    openModal() {
        this.props.toggleModal(true)
    }
    handleSrcoll(e) {
        const id = document.location.pathname.split('/')[2]
        const curCount = this.props.comment.curCount
        const totalCount = this.props.comment.totalCount

        if (this.refs['commentList'].scrollTop > curCount * 100 && curCount < totalCount) {
            this.props.commentActions.getCommentList(id,curCount,true)
        }

        e.stopPropagation()
    }
    renderCommentList(items) {
        let comment = ''

        if(!items instanceof Array || items.length == 0) {
            comment = <p className='site-comment-list-empty'>还没有评论</p>
        } else {
            comment = items.map((item, i) => {
                return (
                    <div className="site-comment-listItem" key={i}>
                        <img className='site-comment-listItem-avatar' src={item.uid.avatar} alt="test"/>
                        <div className="site-comment-listItem-info">
                            <p>{item.content}</p>
                            <p className='meta'>
                                <span>{item.uid.username} </span>
                                <span>{moment(item.create_time).fromNow()} </span>
                                <a onClick={e => this.showReply(e,i)}>回复</a>
                            </p>
                        </div>
                        {item.replys.length == 0 ? ''
                            :
                            item.replys.map((reply,i) =>
                            <div className="site-comment-listItem reply" key={i}>
                                <img className='site-comment-listItem-avatar' src={reply.userinfo.avatar} alt="test"/>
                                <div className="site-comment-listItem-info">
                                    <p>{reply.content}</p>
                                    <p className='meta'>
                                        <span>{reply.userinfo.username} </span>
                                        <span>{moment(reply.create_time).fromNow()}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        {isLogin() ?
                            <form className='newReply hidden' ref={'replyForm' + i} onSubmit={e=>this.submitReply(e,i,item._id)}>
                                <section className="site-comment-editor">
                                    <textarea ref={'comment' + i} rows="4" className='site-comment-editor-text'
                                        placeholder="请留下你的回复">
                                    </textarea>
                                    <button className='btn site-comment-editor-button'>发送回复</button>
                                </section>
                            </form>
                            :
                            <div className="site-comment-info hidden" ref={'noLogin' + i}>
                                <p>你还没有登录，请<a onClick={this.openModal.bind(this)}>登录</a>后再发表回复</p>
                            </div>
                        }

                    </div>
                )
            })
        }

        return comment
    }
    render() {
        const items = this.props.comment.items
        const content = this.renderCommentList(items)

        return (
            <section className='site-comment-list' onScroll={e=>this.handleSrcoll(e)} ref='commentList'>
                { content }
            </section>
        )
    }
}

export default CommentList
