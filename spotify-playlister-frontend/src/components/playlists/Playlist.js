import React from 'react';
import { Link } from 'react-router-dom';

const Playlist = ({url, playlist, deletePlaylist}) => {
    
    const handleClick = () => {
        const configObj = {
            method: 'DELETE',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include'
        }
        
        fetch(`http://localhost:3001/users/${playlist.userId}/playlists/${playlist.id}`, configObj)   
            .then(response => response.json())
            .then(json => !json.errors ? deletePlaylist(playlist.id) : alert(json.errors.join("\n")))
            .catch(error => console.log('API errors:', error))
    }

    return (
        <li>
            <Link to={`${url}/${playlist.id}/songs`}>{playlist.name}</Link>
            <button onClick={handleClick} > X </button>
        </li>
    );
  }
 
export default Playlist;
