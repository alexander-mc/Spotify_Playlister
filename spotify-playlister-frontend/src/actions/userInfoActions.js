export const updateUserInfo = userInfo => {
    return { type: "UPDATE_USER_INFO", userInfo }
}

export const fetchUserInfo = () => {
    return dispatch => {
        dispatch({type: 'LOADING_USER_INFO'});
        fetch('http://localhost:3001/logged_in', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            let userInfo;
            json.logged_in ?
            userInfo = ({ isLoggedIn: true, user: json.user }) :
            userInfo = ({ isLoggedIn: false, user: {} })
            dispatch(updateUserInfo(userInfo))
        })
    }
}