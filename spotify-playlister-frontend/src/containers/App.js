import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PlaylistsContainer from '../containers/PlaylistsContainer'
import Home from '../components/registrations/Home'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup'
import NoMatch from '../components/NoMatch'
import { fetchUser, loginUser, logoutUser } from '../actions/userActions'
import './App.css';

class App extends Component {

  render() {
    const {fetchUser, user, loginUser, logoutUser} = this.props

    return (
      <div>
         <Router>
          <Switch>
            <Route
              exact path='/' 
              render={props => (
              <Home {...props} fetchUser={fetchUser} user={user} /> )}
            />
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
              path='/users/:userId/playlists'
              render={props => (
              <PlaylistsContainer {...props} fetchUser={fetchUser} user={user} loginUser={loginUser} logoutUser={logoutUser} /> )}
            />
            <Route path='*' render={() => <NoMatch /> }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

// const mapStateToProps = ({user}) => ({user})
// const mapDispatchToProps = dispatch => ({
//   loginUser: user => dispatch({ type: "ADD_USER", user }) // or, if importing actions -> loginUser: user => dispatch(loginUser(user))
// })

export default connect( ({user}) => ({user}), {fetchUser, loginUser, logoutUser} )(App);