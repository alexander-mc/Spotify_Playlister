import React from 'react'

const SearchResults = ({songs, errors}) => {

    const handleClick = () => {
        return null
    }

    const renderList = () => (
        <div>
            {songs.map(song => {
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
            })}
        </div>
    )

    return (
        <div>
            { errors.length === 0 ? renderList() : <div>{errors}</div> }
        </div>
    )

}

export default SearchResults