export const addSong = song => {
    return { type: "ADD_SONG", song }
}

export const deleteSong = id => {
    debugger
    return { type: "DELETE_SONG", id }
}

export const resetSongStore = songs => {
    return { type: "RESET_SONG_STORE", songs }
}