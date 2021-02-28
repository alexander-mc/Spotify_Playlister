import React, { Component } from 'react';
import Holding from '../components/Holding'

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
    // debugger
    this.props.fetchLoginInfo()
  }

  handleLoading = () => {
    if (this.props.loginInfo.loading) {
      return this.tempPage()
    }  else {
      return this.authUser()
    }
  }

  authUser = () => {
    if (this.props.loginInfo.isLoggedIn) {
      return this.loadPage()
    } else {
      return this.redirect()
    }
  }

  redirect = () => {
    this.props.history.push('/')
  }

  tempPage = () => <Holding />

  loadPage = () => {
    return (
      <div>
        <button onClick={this.handleClick}>Log Out</button>
        {this.props.loginInfo.user.id}
      </div>
    );
  }

  render () { return <div>{ this.handleLoading() }</div> }
};
  
export default PlaylistsContainer;