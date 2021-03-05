import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import SearchResults from './SearchResults'

class Search extends Component {

  static CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  static CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  state = { query: "", searchResults: [], errors: "" }
  
  accessSpotifyAPI = (query) => {
      
    // Authorize user via Spotify's Client Credientials authorization flow
    // For more info: https://github.com/spotify/web-api-auth-examples
    const request = require('request')      
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(Search.CLIENT_ID + ':' + Search.CLIENT_SECRET).toString('base64')) },
      form: { grant_type: 'client_credentials' },
      json: true
    };
      
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        
        // Access Spotify API via Spotify Web API JS wrapper
        // For more info: https://github.com/JMPerez/spotify-web-api-js
        const spotify = new SpotifyWebApi();
        const token = body.access_token;
        
        spotify.setAccessToken(token)
        spotify.searchTracks(query, { limit: 3 }).then(
          (data) => {
            data.tracks.items.length > 0 ?
              this.setState( {searchResults: data.tracks.items} ) :
              this.setState( {errors: "Sorry, we could not find any songs."} )
            console.log(this.state.searchResults)
          },
          (err) => {
            console.error(err);
          }
        )
      }
    })
  }

  handleChange = (e) => this.setState({ query: e.target.value })
  handleSubmit = (e) => {
    e.preventDefault();        
    this.setState({ errors: '' })
    this.accessSpotifyAPI(this.state.query)
    this.setState({ query: '' })
  }    

  resetSearch = () => this.setState( { query: "", searchResults: [], errors: "" } )

  render() {
    const {query, searchResults, errors} = this.state
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" onChange={ this.handleChange } value={query} />
          <input type="submit" />
          <button onClick={this.resetSearch}>Clear</button>
        </form>
        <SearchResults songs={searchResults} errors={errors} />
      </div>
    )
  }
}

export default Search;