import React, { Component, PropTypes } from 'react'
//import '../assets/less/gotop.less'

class GoTop extends Component {
    render() {
        return (
            <button className={'goTop' + (this.props.isShowTopBtn ? '' : ' hidden')} onClick={this.handleClick} title='返回顶部'>
                <i className='icon-arrow-up'></i>
            </button>
        )
    }
    handleClick() {
        window.scroll(0,0)
    }
}
export default GoTop
