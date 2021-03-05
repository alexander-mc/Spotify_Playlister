import React from 'react';

const SearchResult = ({song}) => {

    const handleClick = () => {
                
    }

    return (
        <div key={song.id}>
            <div>
                <button onClick={handleClick()}>Add</button>
            </div>
            <p>Song: <a target="_blank" rel="noopener noreferrer" href={song.external_urls.spotify}>{song.name}</a></p>
            <p>Album: {song.album.name}</p>
            <p>Artists: {song.artists.map( a => a.name).join(', ')}</p>
        </div>
    )
}

export default SearchResult

