/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-08 23:12:44
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react';
import Navlink from './Navlink'
import '../assets/less/navbar.less';

class Navbar extends Component {
  render() {
    return (
    	<nav className='navbar'>
    		<div className='navbar-brand'>
    		       <a href="/">Z&apos;s Blog</a>
    		</div>
             <a className='navbar-button icon-menu' onClick={this.props.actions.toggleNav}></a>
    		<ul className={(this.props.isShowMenu?'showmeun':'')}>
	    	       <li><Navlink to="/" onlyActiveOnIndex className='icon-home'>首页</Navlink></li>
		       <li><Navlink to="/article" className='icon-blog'>文章</Navlink></li>
		       <li><Navlink to="/album" className='icon-images'>相册</Navlink></li>
		       <li><Navlink to="/music" className='icon-music'>音乐</Navlink></li>
		       <li><Navlink to="/about" className='icon-profile'>关于</Navlink></li>
    		</ul>
    	</nav>
    );
  }
}
Navbar.propTypes = {
      actions: PropTypes.object.isRequired,
      isShowMenu: PropTypes.bool.isRequired,
}
export default Navbar
