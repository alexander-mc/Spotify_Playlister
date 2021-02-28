export const updateLoginInfo = loginInfo => {
    return { type: "UPDATE_LOGIN_INFO", loginInfo }
}

export const fetchLoginInfo = () => {
    return dispatch => {
        dispatch({type: 'LOADING_LOGIN_INFO'});
        fetch('http://localhost:3001/logged_in', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            let loginInfo;
            json.logged_in ?
            loginInfo = ({ isLoggedIn: true, user: json.user }) :
            loginInfo = ({ isLoggedIn: false, user: {} })
            dispatch(updateLoginInfo(loginInfo))
        })
    }
}