/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-08 21:47:18
 * @version $Id$
 */

import React, { Component, PropTypes as Types } from 'react';
import '../assets/less/footer.less';

class Footer extends Component {
  render() {
    return (
      <footer className='site-footer'>
	      <p className='copyright'>
	      		Copyright © <a href="https://github.com/zybbyzaa">ZYB</a> 2016
	      		<br/>
			Powered by zyb
		</p>
      </footer>
    );
  }
}
export default Footer;