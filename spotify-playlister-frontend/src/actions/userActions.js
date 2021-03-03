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
        .then(json => dispatch(loginUser(json)))
    }
}