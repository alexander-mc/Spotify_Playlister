import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import SearchResults from './SearchResults'

class Search extends Component {

    state = { query: "", results: [] }
    
    handleChange = (e) => this.setState({ query: e.target.value })
    handleSubmit = (e) => {
      e.preventDefault();        
      this.setState({ query: '' })
      
      const request = require('request'); // "Request" library
      const client_id = '1ffa3ac0ae7b4bd6b6058b10e66c9475'; // Your client id
      const client_secret = '49276a663c6c44d2b7635e0d5677f40f'; // Your secret
      
      // your application requests authorization
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          
          // use the access token to access the Spotify Web API
          const token = body.access_token;
          
          const spotify = new SpotifyWebApi();
          spotify.setAccessToken(token)
          spotify.searchTracks('Love', { limit: 10 }).then(
            function (data) {
              console.log('Search by "Love"', data);
            },
            function (err) {
              console.error(err);
            }
          );


          const options = {
            url: 'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };
          request.get(options, function(error, response, body) {
            console.log(body);
          });
        }
      });

    }    

    render() {
        return (
          <div>
            <form onSubmit={ this.handleSubmit }>
              <input type="text" onChange={ this.handleChange } value={this.state.query} />
              <input type="submit" />
            </form>
            {/* <SearchResults /> */}
          </div>
        );
    }
};

export default Search;