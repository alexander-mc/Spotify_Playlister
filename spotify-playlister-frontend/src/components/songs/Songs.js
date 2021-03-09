import React from 'react';
import Song from './Song'

const Songs = ({ playlistSongs, match, updateSong }) => {
    
    const renderList = () => playlistSongs.map( playlistSong => {

        // Allows user to add same song to playlist multiple times
        return playlistSong.playlistIds.filter( id => id === parseInt(match.params.playlistId, 10)).map( () =>
            <Song key={playlistSong.id} match={match} playlistSong={playlistSong} updateSong={updateSong} /> 
        )
    })

    return <div> { playlistSongs.length > 0 ? <div>{renderList()}</div> : <div>Add a song</div> } </div>
  
  }
    
  export default Songs;