/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:36:42
 * @version $Id$
 */

import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

function App({ push, children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">首页</Link>
        {' '}
        <Link to="/article">文章</Link>
        {' '}
        <Link to="/album">相册</Link>
        {' '}
        <Link to="/music">音乐</Link>
        {' '}
        <Link to="/message">留言</Link>
        {' '}
        <Link to="/about">关于</Link>
      </header>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}

export default connect(
  null,
  routeActions
)(App)

