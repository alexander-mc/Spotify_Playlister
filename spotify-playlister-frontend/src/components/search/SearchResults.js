import React from 'react'
import SearchResult from './SearchResult'
import styles from './Search.module.css';

const SearchResults = ({match, addSong, searchResults, searchMessage, deleteSearchResults, updateSong, songs}) => {
    const renderList = () => (
        <div className={styles['results-container']} >
            <h2 className={styles['results-header']} >Results</h2>
            {searchResults.map(searchResult => <SearchResult match={match} addSong={addSong} searchResult={searchResult} deleteSearchResults={deleteSearchResults} updateSong={updateSong} songs={songs}/>)}
        </div>
    )
    return <div> {!searchMessage && searchResults.length > 0 ? renderList() : <div>{searchMessage}</div>} </div>
}

export default SearchResults