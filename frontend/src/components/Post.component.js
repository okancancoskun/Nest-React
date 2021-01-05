import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from '../actions';

const Post = () => {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    const postlist = (
        posts.postList.map(post => <div key={post._id}><p>{post.title}</p></div>)
    )
    return (
        <div>
            <p>ilam sayfası</p>
            <div>
                {
                    postlist
                }
            </div>

        </div>
    )
}
export default Post;
