export const addSong = song => {
    debugger
    return { type: "ADD_SONG", song }
}

export const deleteSong = clientId => {
    return { type: "DELETE_SONG", clientId }
}

export const resetSongStore = songs => {
    return { type: "RESET_SONG_STORE", songs }
}