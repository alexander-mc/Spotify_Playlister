import React, { Component } from 'react';
import Holding from '../Holding'
import styles from './Registrations.module.css';

class Login extends Component {

    state = { 
        username: '',
        password: '',
        errors: ''
    };

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    };

    handleSubmit = (e) => {
        e.preventDefault()

        const configObj = {
            user: { username: this.state.username, password: this.state.password }
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            credentials: 'include',
            body: JSON.stringify(configObj)
        })
        .then(response => response.json())
        .then( json => {
            if (json.isLoggedIn) {
              this.props.loginUser(json)
              this.redirect()
            } else {
              this.setState({ errors: json.errors })
            }
        })
        .catch(error => console.log('API errors:', error))
    }
    
    componentDidMount() { this.props.fetchUser() }
    
    handleLoading = () => this.props.user.loading ? this.tempPage() : this.authUser();
    authUser = () => this.props.user.isLoggedIn ? this.redirect() : this.loadPage();
    redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`);
    tempPage = () => <Holding />

    loadPage = () => {
        return (
            <div>
                <h1>SPOTIFY PLAYLISTER</h1>
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
                    <div>or</div>
                    <button className={styles['sign-up-btn']} onClick={ () => this.props.history.push(`/signup`) }>SIGN UP</button>
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

    render() { return <div>{ this.handleLoading() }</div> }
}

export default Login;
