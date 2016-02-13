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
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import * as menuActions from '../actions/menu'
import { bindActionCreators } from 'redux'

class App extends Component {

  // handleScroll(e) {
  //    var e =e || window.event
  //    var scrolltop=document.documentElement.scrollTop||document.body.scrollTop
  //    if(scrolltop>160)
  //       window.scrollTo(0,0)
  // }

  // componentDidMount(e) {
  //   window.onscroll = this.handleScroll
  // }
  render() {
    const { menu, location, actions } = this.props
    return (
      <div>
        <Navbar actions={actions} isShowMenu={menu.isShowMenu}></Navbar>
        <Header location={location}></Header>
        <div className='containers'>{this.props.children}</div>
        <Footer></Footer>
      </div>
    )
  }
}

App.propTypes = {
      menu: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    menu: state.menu,
    location: state.routing.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(menuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
