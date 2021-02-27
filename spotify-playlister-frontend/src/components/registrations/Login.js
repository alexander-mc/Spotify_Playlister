import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Login extends Component {

    state = { 
        username: '',
        password: '',
        errors: ''
    };

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault()

        const confObj = {
            user: {
                username: this.state.username,
                password: this.state.password
            }
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(confObj)
        })
        .then(response => response.json())
        .then( json => {
            if (json.logged_in) {
              this.props.handleLogin(json)
              this.redirect()
            } else {
              this.setState({
                errors: json.errors
              })
            }
        })
        .catch(error => console.log('api errors:', error))
    }
    
    componentDidMount() {
        this.props.getLoginStatus()
        .then( () => this.props.loggedInStatus ? this.redirect() : null )
    }

    redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`) // window.location.href = `/users/${user_id}/playlists`

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
                <h1>Log In</h1>
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
                    <button placeholder="submit" type="submit">
                        Log In
                    </button>
                    <div>
                        or <Link to='/signup'>Sign Up</Link>
                    </div>
                </form>
                <div>
                    { this.state.errors ? this.handleErrors() : null }
                </div>
            </div>
        );
    };
}

export default Login;
