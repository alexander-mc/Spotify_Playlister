import React from 'react';
import { Link } from 'react-router-dom'

const NoMatch = () => {
    
    return (
        <div>
          <h1>Sorry - It seems that page doesn't exist</h1>
          <Link to='/'>Go to main page</Link>
        </div>
    )
}
    
export default NoMatch;