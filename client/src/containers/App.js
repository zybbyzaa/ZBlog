/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:36:42
 * @version $Id$
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import GoTop from '../components/GoTop'
import Footer from '../components/Footer'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../assets/sass/app.scss'

class App extends Component {

    componentDidMount() {
        window.onscroll = this.handleScroll.bind(this)
        document.addEventListener('DOMContentLoaded', function() {
            let html = document.documentElement
            let windowWidth = 0

            if (html.clientWidth < 375) {
                windowWidth = html.clientWidth
            } else if (html.clientWidth < 768) {
                windowWidth = 375
            } else if (html.clientWidth < 960) {
                windowWidth = 480
            }else if(html.clientWidth < 1360){
                windowWidth = 600
            } else {
                windowWidth = 768
            }
            console.log('windowWidth: ' + windowWidth)
            html.style.fontSize = windowWidth / 6.4 + 'px'
        }, false)
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps.nav.isShowMenu)
        if (nextProps.nav.isShowMenu) {
            document.body.className = 'open'
        } else {
            document.body.className = ''
        }
    }
    render() {
        const {nav, location, actions} = this.props

        return (
            <div className='site'>
                <button className="site-navbar-button" onClick={this.props.actions.toggleNav}></button>
                <Navbar></Navbar>
                <Header location={location}></Header>
                <div className="site-content">
                    <ReactCSSTransitionGroup component="div" transitionName="blog" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
                    </ReactCSSTransitionGroup>
                    <aside className="site-content-aside">
                        <GoTop actions={actions} isShowTopBtn={nav.isShowTopBtn}></GoTop>
                    </aside>
                </div>
                <Footer></Footer>
            </div>
        )
    }
    handleScroll() {
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop

        if (scrolltop > 160 && !this.props.nav.isShowTopBtn) {
            this.props.actions.showTopBtn(true)
        }
        if (scrolltop < 160 && this.props.nav.isShowTopBtn) {
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
    return {nav: state.nav, location: state.routing.location}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
