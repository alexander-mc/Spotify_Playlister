import React from 'react'
import SearchResult from './SearchResult'

const SearchResults = ({match, addSong, songs, searchMessage}) => {
    const renderList = () => (
        <div>
            {songs.map(song => <SearchResult match={match} addSong={addSong} song={song} />)}
        </div>
    )
    return <div> {!searchMessage ? renderList() : <div>{searchMessage}</div>} </div>
}

export default SearchResults