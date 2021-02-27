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

// fetchLoginInfo = () => {
//     return (
//       fetch('http://localhost:3001/logged_in', {
//         credentials: 'include' // could also use 'same-origin'
//       })
//       .then(response => response.json())
//       .then(json => {
//         json.logged_in ?
//         this.props.updateLoginInfo({ isLoggedIn: true, user: json.user }) :
//         this.props.updateLoginInfo({ isLoggedIn: false, user: {} })
//       })
//       .catch(error => console.log('API error:', error))
//     )
//   }