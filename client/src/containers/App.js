/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:36:42
 * @version $Id$
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as optionsActions from '../actions/options'
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
    }
    render() {
        const {location, options, actions} = this.props

        return (
            <div className='site'>
                <NavbarButton isShowNav={options.isShowNav} toggleNav={actions.toggleNav}/>
                <Navbar />
                <Header location={location} />
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
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        location: state.routing.location,
        options: state.options.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(optionsActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
