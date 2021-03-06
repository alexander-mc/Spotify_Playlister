import React from 'react'
import { NavLink } from 'react-router-dom'
import { deleteSearchResults } from '../actions/searchActions'

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

    // const handleClickMain = () => deleteSearchResults

    return (
        <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
            <span style={{ textTransform: 'uppercase', marginRight: '10px'}}>
                Welcome {user.username}
            </span>
            <NavLink exact to={`/users/${user.id}/playlists`} style={{ marginRight: '10px' }} activeClassName="nav-active" >
                MAIN
            </NavLink>
            <button onClick={handleClickLogout}>LOG OUT</button>
        </div>
    )
}

export default NavBar;