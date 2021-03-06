import React from 'react';
import Song from './Song'

const Songs = ({ playlistSongs, match, deleteSong }) => {
        
    const renderList = () => playlistSongs.map( playlistSong => <Song match={match} playlistSong={playlistSong} deleteSong={deleteSong} /> )

    return <div> { playlistSongs.length > 0 ? <div>{renderList()}</div> : <div>Add a song</div> } </div>
  
  }
    
  export default Songs;