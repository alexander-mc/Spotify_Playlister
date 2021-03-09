import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Holding from '../components/Holding'
import Home from '../components/registrations/Home'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup'

class HomeContainer extends Component {

  componentDidMount() { this.props.fetchUser() }
  handleLoading = () => this.props.user.loading ? this.tempPage() : this.authUser();
  authUser = () => this.props.user.isLoggedIn ? this.redirect() : this.loadPage();
  redirect = () => this.props.history.push(`/users/${this.props.user.id}/playlists`);  
  tempPage = () => <Holding />

  loadPage = () => {

    const { match, fetchUser, user, loginUser } = this.props

    return (
        <div>
            <h1>Spotify Playlister</h1>
            <Route 
                exact path='/login'
                render={props => (
                    <Login {...props} fetchUser={fetchUser} user={user} loginUser={loginUser} /> )}
            />
            <Route 
                exact path='/signup' 
                render={props => (
                    <Signup {...props} fetchUser={fetchUser} user={user} loginUser={loginUser} /> )}
            />
            <Route
                path={`${match.url}`}
                render={props => (
                    <Home {...props} fetchUser={fetchUser} user={user} /> )}
            />
        </div>
    )
  }

  render () { return <div>{ this.handleLoading() }</div> }
}

export default HomeContainer