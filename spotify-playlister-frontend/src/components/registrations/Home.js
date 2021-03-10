import React, { Component } from 'react';
import Holding from '../Holding'
import styles from './Registrations.module.css';

class Home extends Component {

  componentDidMount() { this.props.fetchUser() }
  
  handleLoading = () => this.props.user.loading ? this.tempPage() : this.authUser();
  authUser = () => this.props.user.isLoggedIn ? this.redirect() : this.loadPage();
  redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`); // window.location.href = `/users/${user_id}/playlists`
  tempPage = () => <Holding />
  
  loadPage = () => {

    return (
      <div className={styles['home-container']}>
        <h1 className={styles.title} >SPOTIFY PLAYLISTER</h1>
        <button className={styles['registration-btn']} onClick={ () => this.props.history.push(`/signup`) }>SIGN UP</button>
        <button className={styles['registration-btn']} onClick={ () => this.props.history.push(`/login`) }>LOG IN</button>
      </div>
    )
  }

  render() { return <div>{ this.handleLoading() }</div> }
};

export default Home;