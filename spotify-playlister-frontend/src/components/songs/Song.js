import React from 'react';

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
        <div>
            <p>Song: <a target="_blank" rel="noopener noreferrer" href={playlistSong.url}>{playlistSong.title}</a></p>
            <p>Album: {playlistSong.album_name}</p>
            <p>Artists: {JSON.parse(playlistSong.artists).join(', ')}</p>
            <button onClick={handleClick} > X </button>
        </div>
    );
  }
 
export default Song;