/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:42:26
 * @version $Id$
 */

import React, { Component, PropTypes as Types } from 'react'
import { connect } from 'react-redux'
import { shouldComponentUpdate } from 'react-immutable-render-mixin'

class Home extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
    }
    render() {
        return (
          <div>
              Home Page
          </div>
        )
    }
}

export default Home
