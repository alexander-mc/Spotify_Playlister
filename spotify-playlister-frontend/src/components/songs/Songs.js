import React from 'react'
import Song from './Song'
import styles from './Songs.module.css'

const Songs = ({ playlistName, playlistSongs, match, updateSong }) => {
    
    const renderList = () => playlistSongs.map( playlistSong => {
        // Allows user to add same song to playlist multiple times
        return playlistSong.playlistIds.filter( id => id === parseInt(match.params.playlistId, 10)).map( () =>
            <Song match={match} playlistSong={playlistSong} updateSong={updateSong} /> 
        )
    })

    return (
        <div className={styles['songs-container']}>
            <h2 className={styles['songs-header']} >{playlistName}</h2>
            { playlistSongs.length > 0 ? <div>{renderList()}</div> : <h5 className={styles['no-songs-txt']}>This playlist is empty</h5> }
        </div>
    )
  
  }
    
  export default Songs;