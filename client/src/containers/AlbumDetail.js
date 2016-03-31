import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as albumsActions from '../actions/albums'
import * as optionsActions from '../actions/options'
import { bindActionCreators } from 'redux'
import AlbumDetailItem from '../components/AlbumDetailItem'
import { ClipLoader } from 'halogen'
import { Link } from 'react-router'

class AlbumDetail extends Component {

    componentDidMount() {
        const id = this.props.params.id

        this.props.actions.getAlbumDetail(id)
    }
    componentWillUpdate(nextProps, nextState) {
        const oldId = this.props.params.id
        const newId = nextProps.params.id

        if (oldId !== newId) {
            this.props.actions.getAlbumDetail(newId)
        }
    }
    renderAlbum(album,count) {
        let item = ''

        if (count > 0) {
            item = <AlbumDetailItem album={album}></AlbumDetailItem>
        }else {
            item = '对不起，当前没有任何相册'
        }
        return item
    }
    // renderError() {
    //     return (
    //         <p className='error'>{ this.props.articles.error }</p>
    //     )
    // }
    render() {
        const album = this.props.album.items
        const count = this.props.album.items_count
        let content = ''

        if (!this.props.album.isFetching) {
            content = this.renderAlbum(album,count)
        }
        return (
          <section className='site-content-main album-detail'>
              <h3 className='site-content-title'>相册详情<Link to="/album" className='return-btn' title='返回相册列表'>-&gt;</Link></h3>
              <div className='site-content-loading'>
                  <ClipLoader size="20px" color="rgba(34,34,34,.5)" loading={this.props.album.isFetching}/>
              </div>
              { content }
          </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        album: state.albumDetail.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(albumsActions, dispatch),
        optionsActions: bindActionCreators(optionsActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumDetail)
