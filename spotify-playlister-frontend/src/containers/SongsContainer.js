import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchContainer from './SearchContainer'
import Songs from '../components/songs/Songs'
import { addSong, deleteSong } from '../actions/songActions'

class SongsContainer extends Component {

    componentDidMount() {
        this.props.deleteSearchResults()
    }

    handleClick = () => {

    }

    findPlaylist = () => this.props.playlists.find( e => e.id === parseInt(this.props.match.params.playlistId, 10) )
    authPlaylist = () => !!this.findPlaylist() ? this.loadPage() : this.redirect()
    redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`)

    loadPage = () => {

        const {match, songs, addSong, deleteSong} = this.props
        const playlistSongs = songs.filter( song => song.playlistIds.includes(parseInt(match.params.playlistId, 10)))
        
        return (
            <div>
                <SearchContainer match={match} playlistSongs={playlistSongs} addSong={addSong} />
                <h3>{this.findPlaylist().name}</h3>
                <Songs playlistSongs={playlistSongs} match={match} deleteSong={deleteSong} />
            </div>
        )
    }
    
    render () { return <div>{this.authPlaylist()}</div> }

};

export default connect( ({songs}) => ({songs} ), { addSong, deleteSong } )(SongsContainer)