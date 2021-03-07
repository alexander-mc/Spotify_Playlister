import { combineReducers } from "redux"

const rootReducer = combineReducers({
    user: userReducer,
    playlists: playlistsReducer,
    songs: songsReducer,
    searchResults: searchReducer
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
            return [...state, action.song]

        case "UPDATE_SONG":
            const index = state.findIndex( s => s.spotify_id === action.song.spotify_id )

            return [
                ...state.slice(0, index),
                action.song,
                ...state.slice(index + 1)
            ]

            // Alternative codes:
            // Object.assign({}, song, {playlistIds: action.song.playlistIds}),
            // OR            
            // let newState = [
            //     ...state.slice(0, index),
            //     { ...song, ...action.song },
            //     ...state.slice(index + 1)
            // ]

        case "DELETE_SONG":
            return state.filter( song => song.id !== action.id )

        case "RESET_SONG_STORE":
            return action.songs;

        default:
            return state
    }
}

function searchReducer(state = { songs: [], message: '' }, action) {
    switch (action.type) {
        case "ADD_SEARCH_RESULTS":
            return { songs: action.searchResults, message: ''}

        case "DELETE_SEARCH_RESULTS":
            return { songs: [], message: '' }

        case "ADD_SEARCH_MESSAGE":
            return { ...state, message: action.message }

        default:
            return state
    }
}