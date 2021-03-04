import React, { Component } from 'react';

class PlaylistInput extends Component {

    state = { name: "", errors: "" }
    
    handleChange = (e) => this.setState({ name: e.target.value })
    handleSubmit = (e) => {
        e.preventDefault();
        
        const { user, addPlaylist, match, history } = this.props
        const configObj = {
            playlist: { name: this.state.name, user_id: user.id }
        }

        fetch(`http://localhost:3001/users/${user.id}/playlists`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            credentials: 'include',
            body: JSON.stringify(configObj)
        })
        .then(response => response.json())
        .then( json => {
            
            if (!json.errors) {
                addPlaylist(json)
                history.push(`${match.url}/${json.id}/songs`)
            } else {
                this.setState({ errors: json.errors })
            }

        })
        .catch(error => console.log('API errors:', error))
    }    

    handleErrors = () => {
        return (
            <div>
                <ul>
                    {this.state.errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    }

    render() {
        return (
          <div>
            <form onSubmit={ this.handleSubmit }>
              <input type="text" onChange={ this.handleChange } value={this.state.name} />
              <input type="submit" />
            </form>
            <div>
                { this.state.errors ? this.handleErrors() : null }
            </div>
          </div>
        );
    }
};

export default PlaylistInput;