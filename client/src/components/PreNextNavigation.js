import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PreNextNavigation extends Component {
    renderPage(pre, next) {
        let link = []

        if (pre._id != undefined) {
            link.push(<Link to={'/article/' + pre._id } className='site-content-preNextNavigation-link' title='上一篇' key={0}>上一篇</Link>)
        }
        if (next._id != undefined) {
            link.push(<Link to={'/article/' + next._id } className='site-content-preNextNavigation-link' title='下一篇' key={1}>下一篇</Link>)
        }
        return link
    }
    render() {
        const pre = this.props.preArticle
        const next = this.props.nextArticle
        const link = this.renderPage(pre, next)

        return (
            <div className='site-content-preNextNavigation'>
                {link}
            </div>
        )
    }
}

export default PreNextNavigation
