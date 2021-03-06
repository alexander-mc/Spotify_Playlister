import React from 'react';

const SearchResult = ({match, song, addSong, deleteSearchResults}) => {

    const handleClick = () => {

        const configObj = {
            song: {
                title: song.name,
                album_name: song.album.name,
                artists: song.artists.map( a => a.name),
                url: song.external_urls.spotify,
                spotify_id: song.id
            }
        }
        
        fetch(`http://localhost:3001${match.url}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            credentials: 'include',
            body: JSON.stringify(configObj)
        })
        .then(response => response.json())
        .then( json => {
            if (!json.errors) {
                deleteSearchResults()
                setTimeout( () => addSong(json), 3000)
            } else {
                alert(json.errors.join("\n"))
            }

        })
        .catch(error => console.log('API errors:', error))


        // addSong(song)
    }

    return (
        <div key={song.id}>
            <div>
                <button onClick={handleClick}>Add</button>
            </div>
            <p>Song: <a target="_blank" rel="noopener noreferrer" href={song.external_urls.spotify}>{song.name}</a></p>
            <p>Album: {song.album.name}</p>
            <p>Artists: {song.artists.map( a => a.name).join(', ')}</p>
        </div>
    )
}

export default SearchResult

