import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {

    const handleClick = () => {
        fetch('http://localhost:3001/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
        .then( () => {
          props.updateLoginInfo({ isLoggedIn: false, user: {} })
        })
        .catch(error => console.log(error))
    }

    return (
        <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
            <span style={{ textTransform: 'uppercase', marginRight: '10px'}}>
                Welcome {props.loginInfo.user.username}
            </span>
            <NavLink exact to={`/users/${props.loginInfo.user.id}/playlists`} style={{ marginRight: '10px' }} activeClassName="nav-active" >
                MAIN
            </NavLink>
            <button onClick={handleClick}>LOG OUT</button>
        </div>
    )
}

export default NavBar;