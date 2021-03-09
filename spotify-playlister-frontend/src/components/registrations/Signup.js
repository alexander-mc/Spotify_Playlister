import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {

    state = { 
        username: '',
        password: '',
        password_confirmation: '',
        errors: ''
    };

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    };

    handleSubmit = (event) => {
        event.preventDefault()
    
        let configObj = {
            user: {
                username: this.state.username,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        }

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            credentials: 'include',
            body: JSON.stringify(configObj)
        })
        .then(response => response.json())
        .then (json => {
            if (json.isLoggedIn) {
              this.props.loginUser(json)
              this.props.history.push(`/users/${this.props.user.id}/playlists`);  
            } else {
              this.setState({ password: '', password_confirmation: '', errors: json.errors })
            }
        })
        .catch(error => console.log('API errors:', error))

    };

    render () {
        return (
            <div>
                <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <input 
                        placeholder="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="password confirmation"
                        type="password"
                        name="password_confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                    />
                    <button placeholder="submit" type="submit">
                        Sign Up
                    </button>
                    <div>
                        or <Link to='/login'>Log In</Link>
                    </div>
                </form>
                <div>
                    { this.state.errors ? this.handleErrors() : null }
                </div>
            </div>
        )
    }

    handleErrors () {
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

}
export default Signup;