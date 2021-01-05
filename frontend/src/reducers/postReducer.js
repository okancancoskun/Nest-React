const initialState = {
    fetching: false,
    fetched: false,
    postList: [],
    error: ''
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POST_PENDING":
            return {
                ...state,
                fethcing: true
            }
        case "GET_POST_DONE":
            return {
                ...state,
                fetching: false,
                fetched: true,
                postList: action.payload
            }
        case "GET_POST_ERROR":
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default postReducer;
