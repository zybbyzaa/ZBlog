/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ScaleLoader } from 'halogen'

class Article extends Component {
    render() {
        return this.props.children
    }
}


export default Article
