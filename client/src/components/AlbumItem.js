import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

moment.locale('zh-cn')
class AlbumItem extends Component {
    renderImg(imgs) {
        if(imgs.length === 4) {
            return (
                <div className="img-4">{imgs.map((img,i) => {
                    return (
                        <img src={img} alt={'img' + i} key={i}/>
                    )
                })}</div>
            )
        }else if (imgs.length < 4 && imgs.length > 1) {
            return (
                <div className="img-2">{imgs.slice(0,2).map((img,i) => {
                    return (
                        <img src={img} alt={'img' + i} key={i}/>
                    )
                })}</div>
            )
        }else if (imgs.length === 1) {
            return (
                <div className="img-1">{imgs.map((img,i) => {
                    return (
                        <img src={img} alt={'img' + i} key={i}/>
                    )
                })}</div>
            )
        }else {
            return <div>当前没有图片</div>
        }
    }
    render() {
        return (
            <figure className="albumItem">
                {
                    this.renderImg(this.props.album.img_url.slice(0,4))
                }
                <h3><Link to={'/album/' + this.props.album._id}>{this.props.album.name}</Link></h3>
                <p>{this.props.album.description}</p>
            </figure>
        )
    }
}
AlbumItem.propTypes = {
    album: PropTypes.object.isRequired
}

export default AlbumItem
