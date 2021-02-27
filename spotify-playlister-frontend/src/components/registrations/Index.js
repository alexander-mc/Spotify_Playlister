import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Index extends Component {

  componentDidMount() {
    this.props.fetchLoginInfo()
    .then( () => this.props.loginInfo.isLoggedIn ? this.redirect() : null )
  }

  redirect = () => this.props.history.push(`/users/${this.props.loginInfo.user.id}/playlists`)

  render () {
    return (
      <div>
        <Link to='/login'>Log In</Link>
        <br></br>
        <Link to='/signup'>Sign Up</Link>
      </div>
    );
  }
};

export default Index;