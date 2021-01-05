import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSearchedPosts } from "../actions";

const Search = (props) => {
    const dispatch = useDispatch();
    const params = new URLSearchParams(props.location.search);
    const searched = useSelector(state => state.searched);
    const result = params.get('result');
    const page = params.get('page')
    console.log(parseInt(page) <= searched.totalPage)
    useEffect(async () => {
        await dispatch(getSearchedPosts(result, page))
    }, [])
    const postlist = (
        searched.postList.map(post => <div key={post._id}><p>{post.title}</p></div>)
    )

    return (
        <div>
            <h4>Toplam Sonuç : {searched.count}</h4>
            {
                postlist.length > 0 ? postlist : <h1>Sonuç Bulunamadı</h1>
            }
            {
                page && parseInt(page) < searched.totalPage && postlist.length > 0 ? <a href={`/search?result=${result}&page=${parseInt(page) + 1}`}>Next</a> : undefined
            }
            {
                !page && postlist.length > 0 ? <a href={`/search?result=${result}&page=2`}>Next</a> : undefined
            }
            {
                parseInt(page) === 1 || !page || postlist.length <= 0 ? undefined : <a href={`/search?result=${result}&page=${parseInt(page) - 1}`}>Prev</a>
            }

        </div>
    )
}

export default Search;