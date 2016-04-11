import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as albumActions from '../actions/albums'
import * as optionsActions from '../actions/options'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'halogen'
import AlbumItem from '../components/AlbumItem'
import PageNavigation from '../components/PageNavigation'

class AlbumList extends Component {

    componentDidMount() {
        const pageNum = this.props.params.pageNum
            ? Number(this.props.params.pageNum)
            : 1

        if (!this.props.location.query.isSearch) {
            this.props.actions.search('album', '')
        }
        this.props.actions.changePageNum(pageNum,'album')
        this.props.actions.getAlbumList()
    }
    componentWillUpdate(nextProps, nextState) {
        const oldPageNum = this.props.params.pageNum
            ? Number(this.props.params.pageNum)
            : 1
        const newPageNum = nextProps.params.pageNum
            ? Number(nextProps.params.pageNum)
            : 1

        if (oldPageNum !== newPageNum) {
            this.props.actions.changePageNum(newPageNum,'album')
            this.props.actions.getAlbumList()
        }
        if (this.props.location.query.isSearch !== nextProps.location.query.isSearch && !nextProps.location.query.isSearch) {
            this.props.actions.setKeyword('album', '')
            this.props.actions.getAlbumList()
        }
    }
    renderAlbum(albums, count) {
        let item = ''

        if (count < 1) {
            item = '对不起，当前没有任何相册'

        } else {
            item = albums.map((album, i) => {
                return (
                    <AlbumItem key={i} album={album}></AlbumItem>
                )
            })
        }
        return item
    }
    // renderError() {
    //     return (
    //         <p className='error'>{this.props.articles.error}</p>
    //     )
    // }
    render() {
        const albums = this.props.albums.items
        const count = this.props.albums.items_count
        let content = ''

        return (
            <section className='site-content-main album-list'>
                <h3 className='site-content-title'>相册列表</h3>
                <div className='site-content-loading'>
                    <ClipLoader size="20px" color="rgba(34,34,34,.5)" loading={this.props.albums.isFetching}/>
                </div>
                <div className="warp">
                    {
                        this.props.albums.isFetching ? null : this.renderAlbum(albums, count)
                    }
                </div>
                <PageNavigation curPage={this.props.options.albumQuery.currentPage} count={count} staPoint='/album' perPage={6}></PageNavigation>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        albums: state.albumList.toJS(),
        options: state.options.toJS(),
        location: state.routing.location
    }
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign({}, albumActions, optionsActions)

    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList)
