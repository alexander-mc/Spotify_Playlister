import React from 'react';

const SearchResult = ({match, addSong, playlistSongs, searchResult, deleteSearchResults}) => {

    const postSong = () => {

        const configObj = {
            song: {
                title: searchResult.name,
                album_name: searchResult.album.name,
                artists: searchResult.artists.map( a => a.name),
                url: searchResult.external_urls.spotify,
                spotify_id: searchResult.id
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
                addSong(json)
            } else {
                alert(json.errors.join("\n"))
            }

        })
        .catch(error => console.log('API errors:', error))

    }

    const handleClick = () => {

        const spotifyIds = playlistSongs.map( s => s.spotify_id )
        !spotifyIds.includes(searchResult.id) ?
            postSong() :
            alert('That song already exists in the playlist')

    }

    return (
        <div key={searchResult.id}>
            <div>
                <button onClick={handleClick}>Add</button>
            </div>
            <p>Song: <a target="_blank" rel="noopener noreferrer" href={searchResult.external_urls.spotify}>{searchResult.name}</a></p>
            <p>Album: {searchResult.album.name}</p>
            <p>Artists: {searchResult.artists.map( a => a.name).join(', ')}</p>
        </div>
    )
}

export default SearchResult

