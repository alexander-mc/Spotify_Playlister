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
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.props.fetchLoginInfo()
  }

  handleLoading = () => this.props.loginInfo.loading ? this.tempPage() : this.authUser();
  authUser = () => this.props.loginInfo.isLoggedIn ? this.loadPage() : this.redirect();
  redirect = () => this.props.history.push('/')
  tempPage = () => <div></div>

  loadPage = () => {
    return (
      <div>
        <Link to='/' onClick={this.handleClick}>Log Out</Link>
        {this.props.loginInfo.user.id}
      </div>
    );
  }

  render () { return <div>{ this.handleLoading() }</div> }
};
  
export default PlaylistsContainer;