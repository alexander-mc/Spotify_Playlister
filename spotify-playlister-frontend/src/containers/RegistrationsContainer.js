import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PlaylistsContainer from '../containers/PlaylistsContainer'
import Index from '../components/registrations/Index'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup'
import NoMatch from '../components/NoMatch'
import { updateLoginInfo, fetchLoginInfo } from '../actions/loginActions'

class RegistrationsContainer extends Component {

  render() {
    const {loginInfo, updateLoginInfo, fetchLoginInfo} = this.props

    return (
      <div>
         <Router>
          <Switch>
            <Route
              exact path='/' 
              render={props => (
              <Index {...props} fetchLoginInfo={fetchLoginInfo} loginInfo={loginInfo} /> )}
            />
            <Route 
              exact path='/login'
              render={props => (
              <Login {...props} fetchLoginInfo={fetchLoginInfo} loginInfo={loginInfo} updateLoginInfo={updateLoginInfo} /> )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} fetchLoginInfo={fetchLoginInfo} loginInfo={loginInfo} updateLoginInfo={updateLoginInfo} /> )}
            />
            <Route
              exact path='/users/:user_id/playlists'
              render={props => (
              <PlaylistsContainer {...props} fetchLoginInfo={fetchLoginInfo} loginInfo={loginInfo} updateLoginInfo={updateLoginInfo} /> )}
            />
            <Route path='*' render={() => <NoMatch /> }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

// const mapStateToProps = ({loginInfo}) => ({loginInfo})
// const mapDispatchToProps = dispatch => ({
//   updateLoginInfo: loginInfo => dispatch({ type: "UPDATE_LOGIN_INFO", loginInfo })
// })

export default connect( ({loginInfo}) => ({loginInfo}), {fetchLoginInfo, updateLoginInfo} )(RegistrationsContainer);
