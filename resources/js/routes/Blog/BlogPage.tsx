import React, {FC, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {fetchPosts} from "../../store/asyncActions/blogPostActionCreateors";
import {useAppDispatch} from "../../hooks/redux";

const BlogPage: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPosts())
    }, [])
    return (
        <section>
            <Outlet/>
        </section>
    );
}

export default BlogPage;
