import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/search/SearchInput'
import SearchResults from '../components/search/SearchResults'
import { addSearchResults, deleteSearchResults, addSearchMessage } from '../actions/searchActions'

class SearchContainer extends Component {

  // resetSearch = () => this.setState( { query: "", searchResults: [], errors: "" } )

  render() {
    const { match, addSong, searchResults, addSearchResults, deleteSearchResults, addSearchMessage } = this.props

    return (
      <div>
        <SearchInput addSearchResults={addSearchResults} deleteSearchResults={deleteSearchResults} addSearchMessage={addSearchMessage}/>
        <SearchResults match={match} addSong={addSong} songs={searchResults.songs} searchMessage={searchResults.message} deleteSearchResults={deleteSearchResults} />
      </div>
    )
  }
}

export default connect( ({searchResults}) => ({searchResults} ), { addSearchResults, deleteSearchResults, addSearchMessage } )(SearchContainer)