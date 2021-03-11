import React from 'react';
import Playlist from './Playlist'
import styles from './Playlists.module.css';

const Playlists = ({ match, playlists, deletePlaylist }) => {

  const renderList = () => (
    <ul>
      { playlists.map(playlist => <Playlist url={match.url} playlist={playlist} deletePlaylist={deletePlaylist } /> )}
    </ul>
  )

  return (
    <div className={styles['playlists-container']} >
      <h2 className={styles['playlists-header']} >YOUR PLAYLISTS</h2>
      { playlists.length > 0 ? renderList() : <h5 className={styles['no-playlists-txt']} >You have no playlists</h5> }
    </div>
  )

}
  
export default Playlists;