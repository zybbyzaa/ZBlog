/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-08 23:12:44
 * @version $Id$
 */

import React, {Component, PropTypes} from 'react'
import Navlink from './Navlink'

class Navbar extends Component {
    render() {
        return (
            <nav className="site-navbar">
                <ul className="site-navbar-list">
                    <li data-text="首页">
                        <Navlink to="/" onlyActiveOnIndex className='icon-home'> 首页</Navlink>
                    </li>
                    <li data-text="文章">
                        <Navlink to="/article" className='icon-book'> 文章</Navlink>
                    </li>
                    <li data-text="相册">
                        <Navlink to="/album" className='icon-image'> 相册</Navlink>
                    </li>
                    <li data-text="音乐">
                        <Navlink to="/music" className='icon-music'> 音乐</Navlink>
                    </li>
                    <li data-text="关于">
                        <Navlink to="/about" className='icon-info-circle'> 关于</Navlink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar
