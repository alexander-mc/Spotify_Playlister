export const addSearchResults = searchResults => {
    return { type: "ADD_SEARCH_RESULTS", searchResults }
}

export const deleteSearchResults = () => {
    return { type: "DELETE_SEARCH_RESULTS" }
}

export const addSearchMessage = message => {
    return { type: "ADD_SEARCH_MESSAGE", message }
}

export const deleteSearchMessage = message => {
    return { type: "DELETE_SEARCH_MESSAGE" }
}