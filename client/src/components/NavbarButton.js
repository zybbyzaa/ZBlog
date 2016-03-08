import React, {Component, PropTypes} from 'react'

export default class NavbarButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowNav: false
        }
        this.toggleNav = this.toggleNav.bind(this)
    }
    toggleNav(e) {
        e.preventDefault()
        if (this.state.isShowNav) {
            document.body.className = ''
            this.setState({isShowNav: false})
        } else {
            document.body.className = 'open'
            this.setState({isShowNav: true})
        }
    }
    render() {
        return (
            <button className="site-navbar-button" onClick={this.toggleNav}></button>
        )
    }
}
