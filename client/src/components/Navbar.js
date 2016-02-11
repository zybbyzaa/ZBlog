/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-08 23:12:44
 * @version $Id$
 */

import React, { Component, PropTypes as Types } from 'react';
import { Link } from 'react-router'
import '../assets/less/navbar.less';

class Navbar extends Component {
  render() {
    return (
    	<nav className='navbar'>
    		<div>
    		       <a href="/">Z&apos;s Blog</a>
    		</div>
                            <button onClick={this.props.toggleMenu}>{this.props.isShowMenu}<i className='icon-menu3'></i></button>
    		<ul className={(this.props.isShowMenu?'showmeun':'')}>
	    	       <li><Link to="/">首页</Link></li>
		       <li><Link to="/article">文章</Link></li>
		       <li><Link to="/album">相册</Link></li>
		       <li><Link to="/music">音乐</Link></li>
		       <li><Link to="/message">留言</Link></li>
		       <li><Link to="/about">关于</Link></li>
    		</ul>
    	</nav>
    );
  }
}
export default Navbar