import React, {Component, PropTypes} from 'react'
//import {connect} from 'react-redux'
//import * as optionsActions from '../actions/options'
//import {bindActionCreators} from 'redux'

class Login extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
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
    handleSubmit() {
        e.preventDefault()
        const {email, password} = this.refs

        this.props.actions.localLogin({email: email.value, password: password.value})
    }
    render() {
        //const {location, options, actions} = this.props

        return (
            <div className='login-page'>
                <h3 className='login-heading'>ZBlog</h3>
                <div>
                    <div className='login-panel'>
                        <h3>登录</h3>
                        <form className='login-form' name='loginForm' onSubmit={this.handleSubmit} noValidate>
                            <input type="text" className='login-email' placeholder='请输入邮箱' ref='email'/>
                            <input type="password" className='login-password' placeholder='输入密码' ref='password'/>
                            <input type="submit" className='login-submit' value='登录'/>
                            <hr />
                        </form>
                        <span>使用其他方式登录</span>
                        <div className='login-link'>
                            <a href="https://github.com/login/oauth/authorize?client_id=f1e112b810375ed8066a&state=11e1102de4e95cb58805a4512b4ea098671d9366&redirect_uri=http://127.0.0.1:8088/" className='login-github-link'>G</a>
                            <a href="#" className='login-webchat-link'>W</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         // location: state.routing.location,
//         // options: state.options.toJS()
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         //actions: bindActionCreators(optionsActions, dispatch)
//     }
// }


//export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login
