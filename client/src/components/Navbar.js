/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-08 23:12:44
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'
import Navlink from './Navlink'
import '../assets/less/navbar.less'

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar'>
                <div className='navbar-brand'>
                    <a href="/" className='navbar-brand-link link'>Z&apos;s Blog</a>
                </div>
                <a className='navbar-button icon-navicon link' onClick={this.props.actions.toggleNav}></a>
                <ul className={(this.props.isShowMenu ? 'showmeun' : '') + ' navbar-list'}>
                    <li>
                        <Navlink to="/" onlyActiveOnIndex className='icon-home link'>首页</Navlink>
                    </li>
                    <li>
                        <Navlink to="/article" className='icon-book link'>文章</Navlink>
                    </li>
                    <li>
                        <Navlink to="/album" className='icon-image link'>相册</Navlink>
                    </li>
                    <li>
                        <Navlink to="/music" className='icon-music link'>音乐</Navlink>
                    </li>
                    <li>
                        <Navlink to="/about" className='icon-info-circle link'>关于</Navlink>
                    </li>
                </ul>
            </nav>
        )
    }
}
Navbar.propTypes = {
    actions: PropTypes.object.isRequired,
    isShowMenu: PropTypes.bool.isRequired
}

export default Navbar
