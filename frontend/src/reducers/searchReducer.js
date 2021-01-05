import axios from "axios";
const initialState = {
    fetching: false,
    fetched: false,
    postList: [],
    count: Number,
    error: '',
    totalPage: Number
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_SEARCHED_PENDING":
            return {
                ...state,
                fetching: true,
            };
        case "GET_SEARCHED_DONE":
            return {
                ...state,
                fetched: true,
                postList: action.payload.data,
                count: action.payload.count,
                totalPage: action.payload.totalPage
            }
        case "GET_SEARCHED_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
};
export default searchReducer;
