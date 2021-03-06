import React from 'react'
import SearchResult from './SearchResult'

const SearchResults = ({match, addSong, playlistSongs, searchResults, searchMessage, deleteSearchResults}) => {
    const renderList = () => (
        <div>
            {searchResults.map(searchResult => <SearchResult match={match} addSong={addSong} playlistSongs={playlistSongs} searchResult={searchResult} deleteSearchResults={deleteSearchResults} />)}
        </div>
    )
    return <div> {!searchMessage ? renderList() : <div>{searchMessage}</div>} </div>
}

export default SearchResults