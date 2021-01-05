import axios from "axios";

const getSearchedPosts = (word, page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:5000/post?search=${word}&size=2&page=${page}`)
            dispatch({
                type: "GET_SEARCHED_PENDING"
            })
            dispatch({
                type: "GET_SEARCHED_DONE",
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: 'GET_SEARCHED_ERROR',
                payload: error
            })
        }
    }
}
export default getSearchedPosts;