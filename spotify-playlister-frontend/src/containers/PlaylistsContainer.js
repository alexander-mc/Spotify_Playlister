import React, { Component } from 'react';
import Holding from '../components/Holding'
import NavBar from '../components/NavBar'

class PlaylistsContainer extends Component {

  componentDidMount() {
    // debugger
    this.props.fetchUserInfo()
  }

  handleLoading = () => {
    if (this.props.userInfo.loading) {
      return this.tempPage()
    }  else {
      return this.authUser()
    }
  }

  authUser = () => {
    // Check user has logged in + :user_id matches logged in user id
    // If :user_id does not match logged in user id, force correct user id in url and redirect PlaylistContainer
    const isValidUser = this.props.userInfo.user.id === parseInt(this.props.match.params.user_id,10)
    if (isValidUser) {
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
        <NavBar userInfo={this.props.userInfo} updateUserInfo={this.props.updateUserInfo} />
      </div>
    );
  }

  render () { return <div>{ this.handleLoading() }</div> }
};
  
export default PlaylistsContainer;