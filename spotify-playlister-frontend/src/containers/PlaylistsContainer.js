import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PlaylistsContainer extends Component {

    handleClick = () => {        
      fetch('http://localhost:3001/logout', {
          method: 'DELETE',
          credentials: 'include'
      })
      .then( response => {
          this.props.handleLogout()
          setTimeout(()=>{
              this.props.history.push('/')
          }, 1000);
      })
      .catch(error => console.log(error))
    }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
          <Link to='/logout' onClick={this.handleClick}>Log Out</Link>
        {this.props.user.id}
      </div>
    );
  }
};
  
export default PlaylistsContainer;