import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PageNavigation extends Component {
    renderPage(curPage, totalPage, staPoint) {
        let link = []

        if (curPage > 1) {
            link.push(<Link to={staPoint + '/page/' + (curPage - 1) } className='site-content-pageNavigation-link' title='上一页' key={0}>&lt;&lt;</Link>)
        }
        for (let i = 1; i < totalPage + 1; i++) {
            if (i == curPage) {
                link.push(<a className='site-content-pageNavigation-link current' key={i}>{i}</a>)
            }else {
                link.push(<Link to={staPoint + '/page/' + i } className='site-content-pageNavigation-link' key={i}>{i}</Link>)
            }
        }
        if (curPage < totalPage) {
            link.push(<Link to={staPoint + '/page/' + (curPage + 1) } className='site-content-pageNavigation-link' title='下一页' key={totalPage + 1}>&gt;&gt;</Link>)
        }
        return link
    }
    render() {
        const curPage = this.props.curPage
        const totalPage = Math.ceil(this.props.count / 3)
        const staPoint = this.props.staPoint
        const link = this.renderPage(curPage, totalPage, staPoint)

        return (
            <div className='site-content-pageNavigation'>
                {link}
            </div>
        )
    }
}

export default PageNavigation
