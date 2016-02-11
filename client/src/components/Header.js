/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-07 23:57:03
 * @version $Id$
 */

import React, { Component, PropTypes as Types } from 'react';
import '../assets/less/header.less';

class Header extends Component {
  render() {
    return (
      <header className='site-header'>
          <h1>Welcome</h1>
          <hr/>
      </header>
    );
  }
}
export default Header;