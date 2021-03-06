import React from 'react';

const Song = ({playlistSong, match, deleteSong}) => {
    
    const handleClick = () => {
        // deleteSong(song.id);
        const configObj = {
            method: 'DELETE',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include'
        }
        debugger
        fetch(`http://localhost:3001${match.url}/${playlistSong.id}`, configObj)   
            .then(response => response.json())
            .then(json => !json.errors ? deleteSong(playlistSong.id) : alert(json.errors.join("\n")))
            .catch(error => console.log('API errors:', error))
    }

    return (
        <div key={playlistSong.id}>
            <p>Song: <a target="_blank" rel="noopener noreferrer" href={playlistSong.url}>{playlistSong.title}</a></p>
            <p>Album: {playlistSong.album_name}</p>
            <p>Artists: {JSON.parse(playlistSong.artists).join(', ')}</p>
            <button onClick={handleClick} > X </button>
        </div>
    );
  }
 
export default Song;