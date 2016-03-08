import React, { Component, PropTypes } from 'react'

export default class ScrollTop extends Component {
    constructor(props){
      super(props);
      this.state = { isShowTop: false}
      this.gotop = this.gotop.bind(this)
      this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll)
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.isShowTop !== this.state.isShowTop
    }
    gotop(e){
        e.preventDefault()
        window.scrollTo(0,0)
    }
    handleScroll(){
        if (window.scrollY > 160) {
            this.setState({ isShowTop: true });
        } else {
            this.setState({ isShowTop: false });
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.isShowTop&&
                    <button className='goTop' onClick={this.gotop} title='返回顶部'>                     
                        <i className='icon-arrow-up'></i>
                    </button>
                }
            </div>
        )
    }
    handleClick() {
        window.scroll(0,0)
    }
}
