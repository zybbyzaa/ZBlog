/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:42:26
 * @version $Id$
 */

import React, { Component, PropTypes as Types } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
    render() {
        return (
          <section className='site-search'>
              <input type="text" placeholder='搜索文章...'/>
              <a href="" className='site-search-btn'>搜索</a>
          </section>
        )
    }
}

export default Home
