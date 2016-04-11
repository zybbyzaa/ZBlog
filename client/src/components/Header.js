import React, { Component, PropTypes } from 'react'
import { isLogin } from '../utils/authService'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {isShowList: false}
    }
    handleBg() {
        const className = this.props.location.pathname.split('/')[1]

        return className
    }
    handleText() {
        const path = this.props.location.pathname.split('/')[1]

        switch (path) {
            case 'article':
                return 'The Article'
            case 'album':
                return 'The Album'
            case 'music':
                return 'The Music'
            case 'about':
                return 'About Me'
            default:
                return 'Welcome'
        }
    }
    handleClick() {
        this.props.logout()
    }
    openModal() {
        this.props.toggleModal(true)
    }
    search() {
        const keyword = this.refs['keyword'].value
        const type = this.refs['stype'].value

        console.log('type => ' + type)
        console.log('text => ' + keyword)
        this.refs['keyword'].className = 'active'
        document.querySelector('.site-search-btn').className = 'site-search-btn active'
        document.querySelector('.site-change-btn').className = 'site-change-btn active'
        if (keyword !== '') {
            this.props.search(type, keyword)
        }
    }
    showList(e, flag) {
        if (document.querySelector('.site-change-btn').className === 'site-change-btn active') {
            if (this.state.isShowList) {
                this.refs['search_type'].style.opacity = 0
                this.state.isShowList = flag || false
            } else {
                this.refs['search_type'].style.opacity = 1
                this.state.isShowList = flag || true
            }
        }
    }
    clickList(e) {
        switch (e.target.innerHTML) {
            case '文章':
                this.refs['stype'].value = 'article'
                break
            case '相册':
                this.refs['stype'].value = 'album'
                break
            case '音乐':
                this.refs['stype'].value = 'song'
                break
            default:
        }
        this.showList(e,false)
        document.querySelector('.site-change-btn').innerHTML = e.target.innerHTML
    }
    renderAvatar() {
        if(!isLogin() || this.props.user === null){
            console.log('logout')
            return (
                <div className="site-header-avatar">
                    <a className='logout' onClick={this.openModal.bind(this)}>登录</a>
                </div>
            )
        } else {
            console.log('login')
            return (
                <div className="site-header-avatar">
                    <img src={this.props.user.avatar} alt="avatar"/>
                    <a onClick={this.handleClick.bind(this)}>登出</a>
                </div>
            )
        }
    }
    render() {
        const content = this.renderAvatar()

        return (
          <header className={'site-header ' + this.handleBg() + (location.pathname.split('/')[1] !== '' ? '' : ' flexfix')}>
              <a href="/" className="site-header-logo">ZBlog</a>
              <h1 className='site-header-title'>{this.handleText()}</h1>
              {
                  location.pathname.split('/')[1] !== '' ?
                  content
                  :
                  <section className='site-search'>
                      <input type="text" placeholder='搜索关键词...' ref='keyword'/>
                      <input type="hidden" ref='stype' value='article'/>
                      <a className='site-search-btn' onClick={e => {this.search()}}>搜索</a>
                      <a className='site-change-btn' onClick={e => {this.showList(e)}}>文章</a>
                      <ul className='site-search-type' ref='search_type' onClick={e => {this.clickList(e)}}>
                          <li>文章</li>
                          <li>相册</li>
                          <li>音乐</li>
                      </ul>
                  </section>
              }
          </header>
        )
    }
}
Header.propTypes = {
    location: PropTypes.object.isRequired
}

export default Header
