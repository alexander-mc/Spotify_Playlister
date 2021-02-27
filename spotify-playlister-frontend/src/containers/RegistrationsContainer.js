import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PlaylistsContainer from '../containers/PlaylistsContainer'
import Index from '../components/registrations/Index'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup'
import NoMatch from '../components/NoMatch'
import Logout from '../components/Logout'

class RegistrationsContainer extends Component {

  componentDidMount() {
    this.fetchLoginInfo()
  }

  fetchLoginInfo = () => {
    return (
      fetch('http://localhost:3001/logged_in', {
        credentials: 'include' // could also use 'same-origin'
      })
      .then(response => response.json())
      .then(json => {
        json.logged_in ?
        this.props.updateLoginInfo({ isLoggedIn: true, user: json.user }) :
        this.props.updateLoginInfo({ isLoggedIn: false, user: {} })
      })
      .catch(error => console.log('API error:', error))
    )
  }

  render() {
    const {loginInfo, updateLoginInfo} = this.props

    return (
      <div>
         <Router>
          <Switch>
            <Route
              exact path='/' 
              render={props => (
              <Index {...props} fetchLoginInfo={this.fetchLoginInfo} loginInfo={loginInfo} /> )}
            />
            <Route 
              exact path='/login'
              render={props => (
              <Login {...props} fetchLoginInfo={this.fetchLoginInfo} loginInfo={loginInfo} updateLoginInfo={updateLoginInfo} /> )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} fetchLoginInfo={this.fetchLoginInfo} loginInfo={loginInfo} updateLoginInfo={updateLoginInfo} /> )}
            />
            <Route
              exact path='/users/:user_id/playlists'
              render={props => (
              <PlaylistsContainer {...props} fetchLoginInfo={this.fetchLoginInfo} loginInfo={loginInfo} updateLoginInfo={updateLoginInfo} /> )}
            />
            <Route exact path='/logout' render={() => <Logout /> }/>
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

const updateLoginInfo = loginInfo => ({ type: "UPDATE_LOGIN_INFO", loginInfo })
export default connect( ({loginInfo}) => ({loginInfo}), {updateLoginInfo} )(RegistrationsContainer);
