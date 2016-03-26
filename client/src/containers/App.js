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
import { isLogin, getCookie } from '../utils/authService'
import Modal from 'react-modal'

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

        if( isLogin() && this.props.auth.user === null){
            this.props.authActions.getUserInfo(this.props.auth.token)
            console.log('user')
        }
    }
    closeModal() {
        this.props.optionsActions.toggleLoginModal(false)
    }
    snsLogin(e,provider) {
        e.preventDefault()

        const host = __DEVELOPMENT__ ? '//localhost:8088/api/auth/' : '/api/auth/'
        let search = host + provider + '?redirectUrl=' + window.location.origin
        const token = getCookie('token')
        if(token) {
            search += '&access_token=' + token.replace(/(^\")|(\"$)/g, "")
        }
        window.location.href = search
    }
    render() {
        const {location, options, optionsActions, auth, authActions} = this.props
        const customStyles = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            },
            content: {
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                border: '1px solid #ccc',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                margin: 'auto',
                padding: '25px',
                width: '325px',
                height: '400px',
                background: 'rgba(71, 71, 71, 0.8)'
            }
        }

        return (
            <div className='site' onClick={this.handleClick.bind(this)}>
                <NavbarButton isShowNav={options.isShowNav} toggleNav={optionsActions.toggleNav}/>
                <Navbar />
                <Header location={location} user={auth.user || null} logout={authActions.logout} toggleModal={optionsActions.toggleLoginModal}/>
                <div className="site-content">
                    { this.props.children }
                    <aside className="site-content-aside">
                    </aside>
                </div>
                <Footer />
                <ScrollTop />
                <Modal isOpen={options.isShowLoginModal} onRequestClose={this.closeModal.bind(this)} style={customStyles}>
                    <h3>ZBlog</h3>
                    <form className='login-form' name='loginForm' onSubmit={this.handleSubmit.bind(this)} noValidates>
                        <label htmlFor='email'>Email Address</label>
                        <input type="text" id='email' className='login-email' placeholder='请输入邮箱' ref='email' required/>
                        <label htmlFor='pass'>Password</label>
                        <input type="password" id='pass' className='login-pass' placeholder='请输入密码' ref='pass' required/>
                        <button type="submit" className='login-submit'>登 录</button>
                        <hr />
                    </form>
                    <div className='oauth-login'>
                        <span>使用其他方式登录</span>
                        <div className='login-link'>
                            <a href="#" className='login-github-link' onClick={e=>this.snsLogin(e,'github')}>G</a>
                            <a href="#" className='login-webchat-link'>W</a>
                        </div>
                    </div>
                    <div className="close" onClick={this.closeModal.bind(this)}></div>
                </Modal>
            </div>
        )
    }
    handleSubmit(e) {
        e.preventDefault()
        const {email, pass} = this.refs

        this.props.authActions.localLogin({email: email.value, password: pass.value})
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
