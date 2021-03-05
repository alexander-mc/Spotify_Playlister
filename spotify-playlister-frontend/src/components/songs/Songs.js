import React from 'react';
import Song from './Song'

const Songs = ({ songs }) => {

    const renderList = () => {
        return songs.map( song => <ul><Song song={song} /></ul> )
    }
  
    return (
      <div>
        { songs.length > 0 ? renderList() : <div>Add a song</div> }
      </div>
    )
  
  }
    
  export default Songs;


    // songList = () => {
    //     const playlistSongs = this.props.songs.filter( song => {
    //         return song.playlistIds.find( id => id === parseInt(this.props.match.params.playlistId, 10))
    //     })
    //     return playlistSongs.map( s => <li>{s.title}</li>)
    // }

    // <ul>
    //     {this.songList()}
    // </ul>

