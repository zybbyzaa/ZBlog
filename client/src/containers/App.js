/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:36:42
 * @version $Id$
 */

import 'normalize.css'
import '../assets/less/app.less'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toggleMenu } from '../actions/menu'
import { bindActionCreators } from 'redux'

class App extends Component {
  render() {
    const { isShowMenu, toggleMenu } = this.props
    console.log(this.props);
    return (
      <div>
        <Navbar toggleMenu={toggleMenu} isShowMenu={isShowMenu}></Navbar>
        <Header></Header>
        <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
        <Footer></Footer>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     isShowMenu: state.isShowMenu
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   }
// }

export default connect(
  state => ({ isShowMenu: state.menu.isShowMenu}),
  dispatch => ({ toggleMenu: () => dispatch(toggleMenu())})
)(App)

