import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css';

const NavBar = ({user, logoutUser}) => {

    const handleClickLogout = () => {
        fetch('http://localhost:3001/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
        .then( () => {
          logoutUser()
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <div className={styles.nav} >
                <h3 className={styles['welcome-txt']}>  WELCOME {user.username} </h3>
                <h3 > <NavLink className={styles['main-txt']} exact to={`/users/${user.id}/playlists`} >
                    MAIN
                </NavLink>
                </h3>
                <button className={styles['log-out-btn']} onClick={handleClickLogout}>LOG OUT</button>
            </div>
            <hr></hr>
        </div>
    )
}

export default NavBar;