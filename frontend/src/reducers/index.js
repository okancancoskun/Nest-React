import { combineReducers } from "redux"
import postReducer from "./postReducer";
import searchReducer from "./searchReducer";

export const rootReducer = combineReducers({
    posts: postReducer,
    searched: searchReducer,
})


