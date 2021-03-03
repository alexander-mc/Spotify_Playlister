import { combineReducers } from "redux"
import { v4 as uuid } from "uuid"; 

const rootReducer = combineReducers({
    user: userReducer,
    playlists: playlistsReducer,
    songs: songsReducer
})

export default rootReducer;

// TODO: MODIFY REDUCERS

function userReducer(state = { id:'', username: '', isLoggedIn: false, loading: true }, action) {
    
    switch (action.type) {
        case "LOADING_USER":
            return { ...state, loading: true }
        
        case "LOGIN_USER":
            return { ...action.user, loading: false }

        case "LOGOUT_USER":
            return { isLoggedIn: false, loading: false }

        default:
            return state
    }
}

function playlistsReducer(state = [], action) {

    switch (action.type) {
        case "ADD_PLAYLIST":
            return [...state, action.playlist]
            
        case "DELETE_PLAYLIST":
            return state.filter( playlist => playlist.id !== action.id )
            
        default:
            return state;
    }
}

function songsReducer(state = [], action) {
    switch (action.type) {
        case "ADD_SONG":
            const review = { text: action.review.text, restaurantId: action.review.restaurantId, id: uuid() };
            return [...state, review]
            // return [...state, {id: cuid(), text: action.text, restaurantId: action.restaurantId}]

        case "DELETE_SONG":
            return state.filter(r => r.id !== action.id)

        default:
            return state
    }
}