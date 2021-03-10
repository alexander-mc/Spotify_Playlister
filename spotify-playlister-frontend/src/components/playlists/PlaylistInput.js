import React, { Component } from 'react';
import styles from './Playlists.module.css';
import addIcon from '../../assets/images/add-icon.png'

class PlaylistInput extends Component {

    state = { name: "", errors: "" }
    
    handleChange = (e) => this.setState({ name: e.target.value })
    handleSubmit = (e) => {
        e.preventDefault();
        
        const { user, addPlaylist, match, history } = this.props
        const configObj = {
            playlist: { name: this.state.name, user_id: user.id }
        }

        fetch(`http://localhost:3001${match.url}`, {
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
    
    render() {
        return (
            <div className={styles['add-playlists-container']}>
                <h2 className={styles['add-playlists-txt']} >ADD A PLAYLIST</h2>
                { this.state.errors ? this.handleErrors() : null }
                <form className={styles['form-grid']} onSubmit={ this.handleSubmit }>
                    <input className={styles['playlists-input']} type="text" onChange={ this.handleChange } value={this.state.name} placeholder='Enter a playlist name' />
                    <input className={styles['add-icon']}  title='Add' type="image" src={addIcon} alt="Add Icon" />
                </form>
            </div>
        );
    }

    handleErrors = () => {
        return (
            <div>
                {this.state.errors.map(error => {
                    return <h5 className={styles['playlist-error-txt']} key={error}>{error}</h5>
                })}
            </div>
        )
    }
};

export default PlaylistInput;