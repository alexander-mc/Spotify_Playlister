import React from 'react';
import Playlist from './Playlist'

const Playlists = ({ match, playlists, deletePlaylist }) => {

  const renderList = () => (
    <ul>
      {playlists.map(playlist => <Playlist url={match.url} playlist={playlist} deletePlaylist={deletePlaylist} /> )}
    </ul>
  )

  return (
    <div>
      { playlists.length > 0 ? renderList() : <div>Add a playlist</div> }
    </div>
  )

}
  
export default Playlists;