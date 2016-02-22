/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import '../assets/less/article.less'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ScaleLoader } from 'halogen'

class Article extends Component {
    render() {
        return (
          <section>
              { this.props.children }
          </section>
        )
    }
}


export default Article
