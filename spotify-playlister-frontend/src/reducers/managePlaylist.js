import { combineReducers } from "redux"
import {v4 as uuid} from "uuid"; 

const rootReducer = combineReducers({
    loginInfo: loginInfoReducer,
    playlists: playlistsReducer,
    songs: songsReducer
})

export default rootReducer;

// TODO: MODIFY REDUCERS

function loginInfoReducer(state = { isLoggedIn: false, user: {} }, action) {
    
    switch (action.type) {
        case "UPDATE_LOGIN_INFO":
            return action.loginInfo

        default:
            return state
    }
}

function playlistsReducer(state = [], action) {
    switch (action.type) {
        case "ADD_PLAYLIST":
            return [...state, {id: uuid(), text: action.text}]
            
        case "DELETE_PLAYLIST":
            return state.filter( r => r.id !== action.id )
            
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