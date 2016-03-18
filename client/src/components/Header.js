/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-07 23:57:03
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'

class Header extends Component {
    handleBg() {
        const className = this.props.location.pathname.split('/')[1]

        return className
    }
    handleText() {
        const path = this.props.location.pathname.split('/')[1]

        switch (path) {
            case 'article':
                return 'The Article'
            case 'album':
                return 'The Album'
            case 'music':
                return 'The Music'
            case 'about':
                return 'About Me'
            default:
                return 'Welcome'
        }
    }
    handleClick() {
        this.props.logout()
    }
    render() {
        let avatarSrc = require('../assets/img/icon.jpg')

        return (
          <header className={'site-header ' + this.handleBg() }>
              <a href="/" className="site-header-logo">ZBlog</a>
              <h1 className='site-header-title'>{this.handleText()}</h1>
              <div className="site-header-avatar">
                  <img src={avatarSrc} alt="avatar"/>
                  <a onClick={this.handleClick.bind(this)}>登出</a>
              </div>
              <hr/>
          </header>
        )
    }
}
Header.propTypes = {
    location: PropTypes.object.isRequired
}

export default Header
