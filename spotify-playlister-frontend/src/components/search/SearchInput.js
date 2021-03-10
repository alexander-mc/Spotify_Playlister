import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import styles from './Search.module.css'
import searchIcon from '../../assets/images/search-icon.png'
import deleteResultsIcon from '../../assets/images/delete-results-icon.png'
import { deleteSearchResults } from '../../actions/searchActions';

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
            <div className={styles['search-container']} >
                <h2 className={styles['find-song-txt']} >SEARCH FOR A SONG</h2>
                <form className={styles['form-grid']} onSubmit={ this.handleSubmit }>
                    <input className={styles['search-input']} type="text" onChange={ this.handleChange } value={this.state.query} placeholder='Enter the name of a song, artist, or album' />
                    <input className={styles['search-icon']} title='Search' type="image" src={searchIcon} alt='Submit query' />
                    <img className={styles['delete-results-icon']} title='Clear all' onClick={this.props.deleteSearchResults} src={deleteResultsIcon} alt='Delete sesarch results' />
                </form>
            </div>
        );
    }
}

export default SearchInput;

