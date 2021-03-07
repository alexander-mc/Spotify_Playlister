import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Holding from '../Holding'

class Home extends Component {

  componentDidMount() { this.props.fetchUser() }

  handleLoading = () => this.props.user.loading ? this.tempPage() : this.authUser();
  authUser = () => this.props.user.isLoggedIn ? this.redirect() : this.loadPage();
  redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`); // window.location.href = `/users/${user_id}/playlists`
  
  tempPage = () => <Holding />
  loadPage = () => {
    return (
      <div>
        <Link to='/login'>Log In</Link>
        <br></br>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )
  }

  render () { return <div>{ this.handleLoading() }</div> }
};

export default Home;