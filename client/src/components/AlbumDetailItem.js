import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

moment.locale('zh-cn')
class AlbumDetailItem extends Component {
    handleClick(e,i) {
        let img = document.querySelector('.img-big')

        img.src = this.refs['img' + i].src
        img.style.top = document.querySelector('.site-header').clientHeight + this.refs['img' + i].offsetTop + 'px'
        img.parentNode.style.height = img.parentNode.parentNode.clientHeight + 'px'
        img.parentNode.style.display = 'block'
        console.log(document.querySelector('.site-header').clientHeight)
    }
    render() {
        const imgs = this.props.album.img_url

        return (
            <div className='warp clearfix'>
            {imgs.map((img,i) => {
                return (
                    <div className="item" key={i}><img src={img} alt={'img' + i} ref={'img' + i} onClick={e => {this.handleClick(e, i)}}/></div>
                )
            })}
            </div>
        )
    }
}
AlbumDetailItem.propTypes = {
    album: PropTypes.object.isRequired
}

export default AlbumDetailItem
