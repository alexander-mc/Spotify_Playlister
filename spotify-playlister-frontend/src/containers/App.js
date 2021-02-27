import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/registrations/Login'
import Signup from '../components/registrations/Signup'
import NoMatch from '../components/NoMatch'
import PlaylistsContainer from './PlaylistsContainer'
import Logout from '../components/Logout'
import './App.css';

class App extends Component {
  
  state = {
    isLoggedIn: false,
    user: {}
  }

  componentDidMount() {
    this.getLoginStatus()
  }

  getLoginStatus = () => {
    return (
      fetch('http://localhost:3001/logged_in', {
        credentials: 'include' // could also use 'same-origin'
      })
      .then(response => response.json())
      .then(json => {
        if (json.logged_in) {
          this.handleLogin(json)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('API error:', error))
    )
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    console.log('logged out')
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div>
         <Router>
          <Switch>
            <Route exact path='/' 
              render={props => (
              <Home {...props} getLoginStatus={this.getLoginStatus} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>
              )}
            />
            <Route 
              exact path='/login'
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} getLoginStatus={this.getLoginStatus} loggedInStatus={this.state.isLoggedIn} user={this.state.user} />
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} getLoginStatus={this.getLoginStatus} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>
              )}
            />
            <Route
              exact path='/users/:user_id/playlists'
              render={props => (
                <PlaylistsContainer {...props} getLoginStatus={this.getLoginStatus} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>
              )}
            />
            <Route exact path='/logout' >
              <Logout />
            </Route>
            <Route path='*' >
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
