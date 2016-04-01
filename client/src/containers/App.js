import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as optionsActions from '../actions/options'
import * as authActions from '../actions/auth'
import { isLogin, getCookie } from '../utils/authService'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import NavbarButton from '../components/NavbarButton'
import ScrollTop from '../components/ScrollTop'
import Footer from '../components/Footer'
import Modal from 'react-modal'
import '../assets/sass/app.scss'

class App extends Component {

    constructor(props){
        super(props)
    }
    componentDidMount() {
        const { auth, authActions } = this.props

        if(isLogin() && auth.user === null){
            authActions.getUserInfo(auth.token)
        }
    }
    closeModal() {
        const { optionsActions } = this.props

        optionsActions.toggleLoginModal(false)
    }
    snsLogin(e,provider) {
        e.preventDefault()

        const host = __DEVELOPMENT__ ? '//localhost:8088/api/auth/' : '/api/auth/'
        const token = getCookie('token')
        let search = host + provider + '?redirectUrl=' + window.location.origin

        if(token) {
            search += '&access_token=' + token.replace(/(^\')|(\'$)/g, '')
        }
        window.location.href = search
    }
    hideMask(e) {
        this.refs['img-big'].parentNode.style.display = 'none'
    }
    render() {
        const {location, options, optionsActions, auth, authActions, children} = this.props
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
                background: 'rgba(71, 71, 71, 0.8)'
            }
        }

        return (
            <div className='site' onClick={e => {
                this.handleClick(e)
            }}>
                <NavbarButton isShowNav={options.isShowNav} toggleNav={optionsActions.toggleNav}/>
                <Navbar />
                <Header location={location} user={auth.user || null} logout={authActions.logout} toggleModal={optionsActions.toggleLoginModal} search={optionsActions.search}/>
                {
                    location.pathname.split('/')[1] === '' ?
                    null
                    :
                    <div className='site-content'>
                        { children }
                        <aside className='site-content-aside'>
                        </aside>
                    </div>
                }

                <Footer />
                <ScrollTop />
                {
                    location.pathname.split('/')[1] === 'album' ?
                    <div className='mask' onClick={e => {
                        this.hideMask(e)
                    }}>
                        <img src='' alt='img' ref='img-big' className='img-big'/>
                    </div>
                    :
                    null
                }
                <Modal isOpen={options.isShowLoginModal} onRequestClose={() => {this.closeModal()}} style={customStyles}>
                    <h3>ZBlog</h3>
                    <form className='login-form' name='loginForm' onSubmit={e => {this.handleSubmit(e)}} noValidates>
                        <label htmlFor='email'>Email Address</label>
                        <input type='text' id='email' className='login-email' placeholder='请输入邮箱' ref='email' required/>
                        <label htmlFor='pass'>Password</label>
                        <input type='password' id='pass' className='login-pass' placeholder='请输入密码' ref='pass' required/>
                        <button type='submit' className='login-submit'>登 录</button>
                        <hr />
                    </form>
                    <div className='oauth-login'>
                        <span>使用其他方式登录</span>
                        <div className='login-link'>
                            <a href='#' className='login-github-link' onClick={e=>this.snsLogin(e,'github')}>G</a>
                            <a href='#' className='login-webchat-link'>W</a>
                        </div>
                    </div>
                    <div className='close' onClick={() => {this.closeModal()}}></div>
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
