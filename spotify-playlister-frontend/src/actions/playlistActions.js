export const addPlaylist = playlist => {
    return { type: "ADD_PLAYLIST", playlist }
}

export const deletePlaylist = id => {
    return { type: "DELETE_PLAYLIST", id }
}