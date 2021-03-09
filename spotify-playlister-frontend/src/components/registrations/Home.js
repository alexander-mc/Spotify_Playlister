import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render () {
    return (
      <div>
        <Link to='/login'>Log In</Link>
        <br></br>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )
  }
};

export default Home;