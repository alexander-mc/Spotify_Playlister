import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PlaylistsContainer extends Component {

  handleClick = () => {        
    fetch('http://localhost:3001/logout', {
        method: 'DELETE',
        credentials: 'include'
    })
    .then( () => {
        this.props.updateLoginInfo({ isLoggedIn: false, user: {} })
        setTimeout(()=>{ this.props.history.push('/') }, 1000);
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
      this.props.fetchLoginInfo()
      .then( () => this.props.loginInfo.isLoggedIn ? null : this.redirect() )
  }

  redirect = () => this.props.history.push('/') 

  render() {
    return (
      <div>
          <Link to='/logout' onClick={this.handleClick}>Log Out</Link>
        {this.props.loginInfo.user.id}
      </div>
    );
  }
};
  
export default PlaylistsContainer;