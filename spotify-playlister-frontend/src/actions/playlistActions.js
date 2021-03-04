export const addPlaylist = playlist => {
    return { type: "ADD_PLAYLIST", playlist }
}

export const deletePlaylist = id => {
    return { type: "DELETE_PLAYLIST", id }
}

export const resetPlaylistStore = playlists => {
    return { type: "RESET_PLAYLIST_STORE", playlists }
}