import { combineReducers } from "redux"
import {v4 as uuid} from "uuid"; 

const rootReducer = combineReducers({
    playlists: playlistsReducer,
    songs: songsReducer
})

export default rootReducer;

// TODO: MODIFY REDUCERS

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