import React from 'react'
import SearchResult from './SearchResult'

const SearchResults = ({songs, searchMessage}) => {
    const renderList = () => <div> {songs.map(song => <SearchResult song={song} />)} </div>
    return <div> {!searchMessage ? renderList() : <div>{searchMessage}</div>} </div>
}

export default SearchResults