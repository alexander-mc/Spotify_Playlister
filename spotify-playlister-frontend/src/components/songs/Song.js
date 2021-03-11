import React from 'react';
import styles from './Songs.module.css'
import deleteIcon from '../../assets/images/delete-icon.png'

const Song = ({playlistSong, match, updateSong}) => {
    
    const handleClick = () => {

        const configObj = {
            method: 'PUT',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include'
        }

        fetch(`http://localhost:3001${match.url}/${playlistSong.id}`, configObj)   
            .then(response => response.json())
            .then(json => {
                if (!json.errors) {
                    const { playlistIds } = playlistSong
                    const index = playlistIds.indexOf(parseInt(match.params.playlistId, 10))
                    if (index > -1) playlistIds.splice(index, 1)
                    updateSong(playlistSong)

                } else {
                    alert(json.errors.join("\n"))
                } 
            })
            .catch(error => console.log('API errors:', error))
    }

    return (
        <div className={styles['list-grid']} key={playlistSong.id}>
            <div className={styles['song-info-container']} >
                <p><span className={styles['song-info-title']}>Song:</span> <a className={styles['song-link']} target="_blank" rel="noopener noreferrer" href={playlistSong.url}>{playlistSong.title}</a></p>
                <p><span className={styles['song-info-title']}>Album:</span> {playlistSong.album_name}</p>
                <p><span className={styles['song-info-title']}>Artist(s):</span> {JSON.parse(playlistSong.artists).join(', ')}</p>
            </div>
            <img className={styles['delete-icon']} title='Delete' src={deleteIcon} onClick={handleClick} alt='Delete icon' />
        </div>
    );
  }
 
export default Song;