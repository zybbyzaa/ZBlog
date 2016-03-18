/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:36:42
 * @version $Id$
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as optionsActions from '../actions/options'
import * as authActions from '../actions/auth'
import {bindActionCreators} from 'redux'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import NavbarButton from '../components/NavbarButton'
import ScrollTop from '../components/ScrollTop'
import Footer from '../components/Footer'
import '../assets/sass/app.scss'

class App extends Component {

    componentDidMount() {
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
            html.style.fontSize = windowWidth / 6.4 + 'px'
        }, false)

        if(this.props.auth.user === null){
            this.props.authActions.getUserInfo(this.props.auth.token)
            console.log('user')
        }
    }
    render() {
        const {location, options, optionsActions, auth, authActions} = this.props

        return (
            <div className='site' onClick={this.handleClick.bind(this)}>
                <NavbarButton isShowNav={options.isShowNav} toggleNav={optionsActions.toggleNav}/>
                <Navbar />
                <Header location={location} user={auth.user} logout={authActions.logout}/>
                <div className="site-content">
                    { this.props.children }
                    <aside className="site-content-aside">
                    </aside>
                </div>
                <Footer />
                <ScrollTop />
            </div>
        )
    }
    handleClick(e) {
        if(this.props.options.isShowNav) {
            document.body.className = ''
            this.props.optionsActions.toggleNav(!this.props.options.isShowNav)
        }
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    optionsActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        location: state.routing.location,
        options: state.options.toJS(),
        auth: state.auth.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        optionsActions: bindActionCreators(optionsActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
