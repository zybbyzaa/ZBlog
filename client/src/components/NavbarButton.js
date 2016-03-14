import React, {Component, PropTypes} from 'react'

export default class NavbarButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        e.stopPropagation()
        if (this.props.isShowNav) {
            document.body.className = ''
        } else {
            document.body.className = 'open'
        }
        this.props.toggleNav(!this.props.isShowNav)
    }
    render() {
        return (
            <button className="site-navbar-button" onClick={this.handleClick}></button>
        )
    }
}
