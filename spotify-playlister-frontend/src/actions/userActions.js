import { resetPlaylistStore } from "./playlistActions"
import { resetSongStore } from "./songActions"

export const loginUser = user => {
    return { type: "LOGIN_USER", user }
}

export const logoutUser = () => {
    return { type: "LOGOUT_USER" }
}

export const fetchUser = () => {
    return dispatch => {
        dispatch({type: 'LOADING_USER'});       
        fetch('http://localhost:3001/logged_in', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            if (json.user.isLoggedIn) {
                dispatch(resetPlaylistStore(json.playlists))
                // First clear playlist store (this is necessary when user logs out or during multiple redirects, such as if user manually enters incorrect playlistId url param
                // dispatch(resetPlaylistStore(json.playlists))
                // Then add playlists from the server to the store
                // for (const playlist of json.playlists) dispatch(addPlaylist(playlist))
                dispatch(resetSongStore(json.songs))
            }

            // Must keep below for loop (otherwise, for loop will occur after authPlaylist, resulting in an undesired redirect)
            dispatch(loginUser(json.user))
        })
    }
}