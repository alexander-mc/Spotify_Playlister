import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PlaylistsContainer from '../containers/PlaylistsContainer'
import Home from '../components/registrations/Home'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup'
import NoMatch from '../components/NoMatch'
import { updateUserInfo, fetchUserInfo } from '../actions/userInfoActions'
import './App.css';

class App extends Component {

  render() {
    const {userInfo, updateUserInfo, fetchUserInfo} = this.props

    return (
      <div>
         <Router>
          <Switch>
            <Route
              exact path='/' 
              render={props => (
              <Home {...props} fetchUserInfo={fetchUserInfo} userInfo={userInfo} /> )}
            />
            <Route 
              exact path='/login'
              render={props => (
              <Login {...props} fetchUserInfo={fetchUserInfo} userInfo={userInfo} updateUserInfo={updateUserInfo} /> )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} fetchUserInfo={fetchUserInfo} userInfo={userInfo} updateUserInfo={updateUserInfo} /> )}
            />
            <Route
              exact path='/users/:user_id/playlists'
              render={props => (
              <PlaylistsContainer {...props} fetchUserInfo={fetchUserInfo} userInfo={userInfo} updateUserInfo={updateUserInfo} /> )}
            />
            <Route path='*' render={() => <NoMatch /> }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

// const mapStateToProps = ({userInfo}) => ({userInfo})
// const mapDispatchToProps = dispatch => ({
//   updateUserInfo: userInfo => dispatch({ type: "UPDATE_USER_INFO", userInfo })
// })

export default connect( ({userInfo}) => ({userInfo}), {fetchUserInfo, updateUserInfo} )(App);