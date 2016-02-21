/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:36:42
 * @version $Id$
 */

import '../assets/less/app.less'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import GoTop from '../components/GoTop'
import Footer from '../components/Footer'
import * as navActions from '../actions/nav'
import { bindActionCreators } from 'redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends Component {

    componentDidMount() {
        window.onscroll = this.handleScroll.bind(this)
    }
    render() {
        const { nav, location, actions } = this.props

        return (
          <div className='site'>
            <Navbar actions={actions} isShowMenu={nav.isShowMenu}></Navbar>
            <Header location={location}></Header>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="blog"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {React.cloneElement(this.props.children, {
                  key: this.props.location.pathname
              })}
            </ReactCSSTransitionGroup>
            <GoTop actions={actions} isShowTopBtn={nav.isShowTopBtn} ></GoTop>
            <Footer></Footer>
          </div>
        )
    }
    handleScroll() {
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop

        if(scrolltop > 160 && !this.props.nav.isShowTopBtn){
            this.props.actions.showTopBtn(true)
        }
        if(scrolltop < 160 && this.props.nav.isShowTopBtn){
            this.props.actions.showTopBtn(false)
        }
    }
}

App.propTypes = {
    nav: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        location: state.routing.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
