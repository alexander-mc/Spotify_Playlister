import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Holding from '../components/Holding'
import NavBar from '../components/NavBar'
import Playlists from '../components/playlists/Playlists'
import PlaylistInput from '../components/playlists/PlaylistInput'
import SongsContainer from './SongsContainer'
import { connect } from 'react-redux'
import { addPlaylist, deletePlaylist } from '../actions/playlistActions'

class PlaylistsContainer extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  handleLoading = () => {
    if (this.props.user.loading) {
      return this.tempPage()
    }  else {
      return this.authUser()
    }
  }

  authUser = () => {
    // Check user has logged in + :userId matches logged in user id
    // If :userId does not match logged in user id, force correct user id in url and redirect PlaylistContainer
    const isValidUser = this.props.user.id === parseInt(this.props.match.params.userId, 10)
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
    const { user, logoutUser, match, history, playlists, addPlaylist, deletePlaylist } = this.props

    return (
      <div>
        <NavBar user={user} logoutUser={logoutUser} />
        <Route 
          exact path={`${match.url}`}
          render={ () => (
            <div>
              <PlaylistInput user={user} url={match.url} history={history} addPlaylist={addPlaylist} />
              <Playlists url={match.url} playlists={playlists} deletePlaylist={deletePlaylist} />
            </div>
          )}
        />
        <Route 
          path={`${match.url}/:playlistId/songs`}
          render={ props => (
            <SongsContainer {...props} /> )}
        />
      </div>
    );
  }

  render () { return <div>{ this.handleLoading() }</div> }
};
  
export default connect( ({playlists}) => ({playlists}), { addPlaylist, deletePlaylist } )(PlaylistsContainer)