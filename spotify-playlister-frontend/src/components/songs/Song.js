import React from 'react';

const Song = ({song, deleteSong}) => {
    
    const handleClick = () => {
        deleteSong(song.id);
        // const configObj = {
        //     method: 'DELETE',
        //     headers: {'Content-type': 'application/json; charset=UTF-8'},
        //     credentials: 'include'
        // }

        // fetch(`http://localhost:3001/users/${playlist.userId}/playlists/${playlist.id}`, configObj)   
        // .then(response => response.json())
        // .then(json => !json.errors ? deletePlaylist(playlist.id) : alert(json.errors.join("\n")))
        // .catch(error => console.log('API errors:', error))
    }

    return (
        <li key={song.id}>
            {song.title}
            <button onClick={handleClick} > X </button>
        </li>
    );
  }
 
export default Song;