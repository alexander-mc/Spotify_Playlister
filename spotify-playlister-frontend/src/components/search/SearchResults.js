import React from 'react'
import SearchResult from './SearchResult'
import styles from './Search.module.css';

const SearchResults = ({match, addSong, searchResults, searchMessage, deleteSearchResults, updateSong, songs}) => {
    
    const showContainer = () => (
        <div className={styles['results-container']}>
            <h2 className={styles['results-header']} >RESULTS</h2>
            { searchResults.length > 0 ? renderList() : <h5 className={styles['no-results-txt']}>{searchMessage}</h5> }
        </div>
    )

    const renderList = () => (
        <div >
            { searchResults.map(searchResult => <SearchResult match={match} addSong={addSong} searchResult={searchResult} deleteSearchResults={deleteSearchResults} updateSong={updateSong} songs={songs}/>) }
        </div>
    )

    return <div> { !!searchMessage || searchResults.length > 0 ? showContainer() : null } </div>
}

export default SearchResults