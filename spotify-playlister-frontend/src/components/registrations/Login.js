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
            <div className={styles['registration-container']}>
                <div className={styles['registration-border']}>
                    <h1>SPOTIFY PLAYLISTER</h1>
                    { this.state.errors ? this.handleErrors() : null }
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className={styles['input-field']}
                            placeholder="USERNAME"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <input
                            className={styles['input-field']}
                            placeholder="PASSWORD"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <button className={styles['registration-btn']} placeholder="submit" type="submit">
                            LOG IN
                        </button>
                    </form>
                    <div>
                        <h4 className={styles['or-txt']}>OR</h4>
                        <button className={styles['registration-btn']} onClick={ () => this.props.history.push(`/signup`) }>SIGN UP</button>
                    </div>
                </div>
            </div>
        );
    }

    handleErrors = () => {
        return (
            <div className={styles['registration-errors-container']}>
                {this.state.errors.map(error => {
                    return <span key={error}>{error}</span>
                })}
            </div>
        )
    }

    render() { return <div>{ this.handleLoading() }</div> }
}

export default Login;
