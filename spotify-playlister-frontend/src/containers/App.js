import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeContainer from '../containers/HomeContainer'
import PlaylistsContainer from '../containers/PlaylistsContainer'
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
              path='/users/:userId/playlists'
              render={props => (
              <PlaylistsContainer {...props} fetchUser={fetchUser} user={user} loginUser={loginUser} logoutUser={logoutUser} /> )}
            />
            <Route 
              path='/'
              render={props => (
              <HomeContainer {...props} fetchUser={fetchUser} user={user} loginUser={loginUser} /> )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect( ({user}) => ({user}), {fetchUser, loginUser, logoutUser} )(App);

// Alternative code:
// const mapStateToProps = ({user}) => ({user})
// const mapDispatchToProps = dispatch => ({
//   loginUser: user => dispatch({ type: "ADD_USER", user }) // or, if importing actions -> loginUser: user => dispatch(loginUser(user))
// })