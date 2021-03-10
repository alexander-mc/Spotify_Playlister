import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Playlists.module.css';
import deleteIcon from '../../assets/images/delete-icon.png'

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
        <li key={playlist.id} >
            <div className={styles['list-grid']} >
                <Link className={styles.links} to={`${url}/${playlist.id}/songs`}>{playlist.name}</Link>
                <img className={styles['delete-icon']} title='Delete' src={deleteIcon} onClick={handleClick} alt='Delete icon' />
            </div>
        </li>
    );
  }
 
export default Playlist;
