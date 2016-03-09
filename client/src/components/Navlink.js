/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-11 22:54:31
 * @version $Id$
 */

import React, { Component } from 'react'
import { Link } from 'react-router'

class Navlink extends Component {
  render() {
      return (
        <Link {...this.props} activeClassName="active"/>
      )
  }
}

export default Navlink
