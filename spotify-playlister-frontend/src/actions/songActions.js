export const addSong = song => {
    return { type: "ADD_SONG", song }
}

export const updateSong = song => {
    return { type: "UPDATE_SONG", song }
}

export const resetSongStore = songs => {
    return { type: "RESET_SONG_STORE", songs }
}