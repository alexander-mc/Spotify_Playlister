import React from 'react';

const SearchResult = ({match, addSong, searchResult, deleteSearchResults, songs, updateSong}) => {

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
                const song = songs.find( s => s.spotify_id === json.spotify_id )
                song ? updateSong(json) : addSong(json)
                deleteSearchResults()

            } else {
                alert(json.errors.join("\n"))
            }

        })
        .catch(error => console.log('API errors:', error))

    }

    return (
        <div>
            <div> <button onClick={postSong}>Add</button> </div>
            <p>Song: <a target="_blank" rel="noopener noreferrer" href={searchResult.external_urls.spotify}>{searchResult.name}</a></p>
            <p>Album: {searchResult.album.name}</p>
            <p>Artists: {searchResult.artists.map( a => a.name).join(', ')}</p>
        </div>
    )
}

export default SearchResult