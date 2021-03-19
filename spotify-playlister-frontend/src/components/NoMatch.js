import React from 'react';
import { Link } from 'react-router-dom'
import styles from './NoMatch.module.css'

const NoMatch = () => {
    
    return (
        <div className={styles.container}>
          <h2 className={styles['error-code']}>404</h2>
          <h2 className={styles['error-msg']}> Page not found</h2>
          <h5 className={styles['homepage-link-box']}><Link className={styles['homepage-link']} to='/'>Go to Main Page</Link></h5>
        </div>
    )
}
    
export default NoMatch;