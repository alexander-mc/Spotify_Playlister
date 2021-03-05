import { combineReducers } from "redux"
import { v4 as uuid } from "uuid"; 

const rootReducer = combineReducers({
    user: userReducer,
    playlists: playlistsReducer,
    songs: songsReducer
})

export default rootReducer;

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
            // Alternative code: Only add a playlist if it is not already in state
            // return state.find(e => e.id === action.playlist.id) ? [...state] : [...state, action.playlist];    

        case "DELETE_PLAYLIST": 
            return state.filter( playlist => playlist.id !== action.id );
            
        case "RESET_PLAYLIST_STORE":
            return action.playlists;

        default:
            return state;
    }
}

function songsReducer(state = [], action) {
    switch (action.type) {
        case "ADD_SONG":
            const song = { title: action.song.title, clientId: uuid() };
            return [...state, song]

        case "DELETE_SONG":
            return state.filter( song => song.clientId !== action.clientId )
           
        // case "SAVE_SONG":
        //     return null

        case "RESET_SONG_STORE":
            return action.songs;

        default:
            return state
    }
}