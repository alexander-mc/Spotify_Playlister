import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/search/SearchInput'
import SearchResults from '../components/search/SearchResults'
import { addSearchResults, deleteSearchResults, addSearchMessage, deleteSearchMessage } from '../actions/searchActions'

class SearchContainer extends Component {

  // resetSearch = () => this.setState( { query: "", searchResults: [], errors: "" } )

  render() {
    const { searchResults, addSearchResults, deleteSearchResults, addSearchMessage, deleteSearchMessage } = this.props

    return (
      <div>
        <SearchInput addSearchResults={addSearchResults} deleteSearchResults={deleteSearchResults} addSearchMessage={addSearchMessage}/>
        <SearchResults songs={searchResults.songs} searchMessage={searchResults.message} />
      </div>
    )
  }
}

export default connect( ({searchResults}) => ({searchResults} ), { addSearchResults, deleteSearchResults, addSearchMessage, deleteSearchMessage } )(SearchContainer)