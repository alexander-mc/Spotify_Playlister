import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

class SearchInput extends Component {

    static CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    static CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  
    state = { query: "" }
    
    accessSpotifyAPI = (query) => {
        
      // Authorize user via Spotify's Client Credientials authorization flow
      // For more info: https://github.com/spotify/web-api-auth-examples
      const request = require('request')      
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(SearchInput.CLIENT_ID + ':' + SearchInput.CLIENT_SECRET).toString('base64')) },
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
                this.props.addSearchResults( data.tracks.items ) :
                this.props.addSearchMessage( "Sorry, we could not find any songs." )
                
              console.log(this.props.searchResults)
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
      this.accessSpotifyAPI(this.state.query)
      this.setState({ query: '' })
    }    

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input type="text" onChange={ this.handleChange } value={this.state.query} />
                <input type="submit" />
                <button onClick={this.props.deleteSearchResults}>Clear</button>
            </form>
        );
    }
}

export default SearchInput;

