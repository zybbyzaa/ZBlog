import React, { Component, PropTypes } from 'react'
import '../assets/less/pagenavigation.less'
import { Link } from 'react-router'

class PageNavigation extends Component {
    renderPageNavPre(curPage) {
        if (curPage > 1) {
            return (<Link to={'/article/page/' + (curPage - 1) } className='site-content-pageNavigation-link' title='上一页'>&lt;&lt;</Link>)
        }
    }
    renderPageNavNext(curPage, totalPage) {
        if (curPage < totalPage) {
            return (<Link to={'/article/page/' + (curPage + 1) } className='site-content-pageNavigation-link' title='下一页'>&gt;&gt;</Link>)
        }
    }
    renderPage(curPage, totalPage) {
        let link = []

        for (var i = 1; i < totalPage + 1; i++) {
            if (i == curPage) {
                link.push(<span className='site-content-pageNavigation-span'>{i}</span>)
            }else {
                link.push(<Link to={'/article/page/' + i } className='site-content-pageNavigation-link'>{i}</Link>)
            }
        }
        return link
    }
    render() {
        const curPage = this.props.curPage
        const totalPage = Math.ceil(this.props.count / 3)
        const linkPre = this.renderPageNavPre(curPage)
        const linkNext = this.renderPageNavNext(curPage, totalPage)
        const link = this.renderPage(curPage, totalPage)

        return (
            <div className='site-content-pageNavigation'>
                {linkPre}
                {link}
                {linkNext}
            </div>
        )
    }
}

export default PageNavigation
