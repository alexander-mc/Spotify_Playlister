import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from '../components/songs/Search'
import Songs from '../components/songs/Songs'

class SongsContainer extends Component {

    // componentDidMount() {
    //     debugger
    //     // this.props.fetchUser()
    // }

    // handleLoading = () => {
    //     // if (this.props.user.loading) {
    //     //     return this.tempPage()
    //     // } else {
    //         return this.authPlaylist()
    //     // }
    // }

    handleClick = () => {

    }

    findPlaylist = () => this.props.playlists.find( e => e.id === parseInt(this.props.match.params.playlistId, 10) )
    authPlaylist = () => !!this.findPlaylist() ? this.loadPage() : this.redirect()
    redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`)
    
    playlistSongs = () => {
        return this.props.songs.filter( song => {
            return song.playlistIds.find( id => id === parseInt(this.props.match.params.playlistId, 10))
        })
    }

    loadPage = () => {

        return (
            <div>
                <Search />
                <h3>{this.findPlaylist().name}</h3>
                <Songs songs={this.playlistSongs()} />
            </div>
        )
    }
    
    render () { return <div>{this.authPlaylist()}</div> }

};

export default connect( ({songs}) => ({songs} ), {  } )(SongsContainer)