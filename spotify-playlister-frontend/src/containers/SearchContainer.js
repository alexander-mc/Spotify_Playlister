import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/search/SearchInput'
import SearchResults from '../components/search/SearchResults'
import { addSearchResults, deleteSearchResults, addSearchMessage } from '../actions/searchActions'
import { updateSong } from '../actions/songActions'

class SearchContainer extends Component {

  render() {
    const { match, addSong, updateSong, songs, searchResults, addSearchResults, deleteSearchResults, addSearchMessage } = this.props

    return (
      <div>
        <SearchInput addSearchResults={addSearchResults} deleteSearchResults={deleteSearchResults} addSearchMessage={addSearchMessage}/>
        <SearchResults match={match} addSong={addSong} searchResults={searchResults.songs} searchMessage={searchResults.message} deleteSearchResults={deleteSearchResults} updateSong={updateSong} songs={songs} />
      </div>
    )
  }
}

export default connect( ({searchResults, songs}) => ({searchResults, songs} ), { addSearchResults, deleteSearchResults, addSearchMessage, updateSong } )(SearchContainer)