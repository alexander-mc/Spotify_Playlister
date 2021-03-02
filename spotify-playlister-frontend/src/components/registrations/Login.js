import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Holding from '../Holding'

class Login extends Component {

    state = { 
        username: '',
        password: '',
        errors: ''
    };

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    };

    handleSubmit = (event) => {
        event.preventDefault()

        const confObj = {
            user: { username: this.state.username, password: this.state.password }
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            credentials: 'include',
            body: JSON.stringify(confObj)
        })
        .then(response => response.json())
        .then( json => {
            if (json.logged_in) {
              this.props.updateUserInfo({ isLoggedIn: true, user: json.user })
              this.redirect()
            } else {
              this.setState({ errors: json.errors })
            }
        })
        .catch(error => console.log('API errors:', error))
    }
    
    componentDidMount() {
        // debugger
        this.props.fetchUserInfo()
    }

    handleLoading = () => this.props.userInfo.loading ? this.tempPage() : this.authUser();
    authUser = () => this.props.userInfo.isLoggedIn ? this.redirect() : this.loadPage();
    redirect = () => this.props.history.push(`/users/${this.props.userInfo.user.id}/playlists`);
    
    tempPage = () => <Holding />
    loadPage = () => {
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

    render () { return <div>{ this.handleLoading() }</div> }
}

export default Login;
