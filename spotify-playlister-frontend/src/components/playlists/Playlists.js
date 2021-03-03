import React from 'react';
import Playlist from './Playlist'

const Playlists = ({ url, playlists, deletePlaylist }) => {

    return (
        <ul>
          {playlists.map( playlist => 
            <Playlist url={url} playlist={playlist} deletePlaylist={deletePlaylist} />
          )}
        </ul>
    )
}

export default Playlists;