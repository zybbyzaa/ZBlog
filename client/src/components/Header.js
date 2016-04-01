/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-07 23:57:03
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'
import { isLogin } from '../utils/authService'

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
    openModal() {
        this.props.toggleModal(true)
    }
    renderAvatar() {
        if(!isLogin() || this.props.user === null){
            console.log('logout')
            return (
                <div className="site-header-avatar">
                    <a className='logout' onClick={this.openModal.bind(this)}>登录</a>
                </div>
            )
        } else {
            console.log('login')
            return(
                <div className="site-header-avatar">
                    <img src={this.props.user.avatar} alt="avatar"/>
                    <a onClick={this.handleClick.bind(this)}>登出</a>
                </div>
            )
        }
    }
    render() {
        const content = this.renderAvatar()

        return (
          <header className={'site-header ' + this.handleBg() + (location.pathname.split('/')[1] !== '' ? '' : ' flexfix')}>
              <a href="/" className="site-header-logo">ZBlog</a>
              <h1 className='site-header-title'>{this.handleText()}</h1>
              {
                  location.pathname.split('/')[1] !== '' ?
                  content
                  :
                  <section className='site-search'>
                      <input type="text" placeholder='搜索文章...'/>
                      <a className='site-search-btn'>搜索</a>
                      <ul className='site-search-type'>
                          <h3>请选择搜索类别</h3>
                          <li>文章</li>
                          <li>相册</li>
                          <li>音乐</li>
                      </ul>
                  </section>
              }
          </header>
        )
    }
}
Header.propTypes = {
    location: PropTypes.object.isRequired
}

export default Header
