/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:43:43
 * @version $Id$
 */

import '../assets/less/article.less'
import React, { Component, PropTypes } from 'react'
import fetch from 'node-fetch'

class Article extends Component {
    componentWillMount() {
        fetch('http://localhost:8089/api/article')
        .then(function(res) {
            return res.json();
        }).then(function(json) {
            console.log(json);
        });
    }
    render() {
        return (
          <section className='site-article'>

          </section>
        )
    }
}

export default Article
