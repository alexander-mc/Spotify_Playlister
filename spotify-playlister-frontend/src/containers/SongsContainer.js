import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchContainer from './SearchContainer'
import Songs from '../components/songs/Songs'
import { addSong, updateSong } from '../actions/songActions'

class SongsContainer extends Component {

    componentDidMount() { this.props.deleteSearchResults() }

    findPlaylist = () => this.props.playlists.find( e => e.id === parseInt(this.props.match.params.playlistId, 10) )
    authPlaylist = () => !!this.findPlaylist() ? this.loadPage() : this.redirect()
    redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`)

    loadPage = () => {

        const {match, songs, addSong, updateSong} = this.props
        const playlistSongs = songs.filter( song => song.playlistIds.includes(parseInt(match.params.playlistId, 10)))
        
        return (
            <div>
                <SearchContainer match={match} addSong={addSong} />
                <Songs playlistName={this.findPlaylist().name} playlistSongs={playlistSongs} match={match} updateSong={updateSong} />
            </div>
        )
    }
    
    render () { return <div>{this.authPlaylist()}</div> }

};

export default connect( ({songs}) => ({songs} ), { addSong, updateSong } )(SongsContainer)