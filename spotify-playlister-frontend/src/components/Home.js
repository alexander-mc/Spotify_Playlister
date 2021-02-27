import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {

  componentDidMount() {
    this.props.getLoginStatus()
    .then( () => this.props.loggedInStatus ? this.redirect() : null )
  }

  redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`)

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

export default Home;