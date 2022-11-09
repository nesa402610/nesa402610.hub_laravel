import React from 'react';
import PostCard from "../../components/blog/PostCard";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setModal} from "../../store/reducers/modalSlice";
import PostForm from "../../components/admin/PostForm";

const BlogPostsPage = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const {posts} = useAppSelector(state => state.posts)

    const createPost = () => {
        dispatch(setModal({title: 'Создание поста', children: <PostForm/>}))
    }
    return (
        <>
            {!posts && <h2 className={'text-3xl font-bold text-center'}>Ничего нет :(</h2>}
            <h1 className={'text-center text-3xl mb-8 font-bold'}>Посты</h1>
            <div className={'px-4 gap-4 grid sm:grid-cols-4 xs:grid-cols-1'}>
                {user?.id === 1 &&
                    <div className={'block--darker'} onClick={createPost}>
                        Новый пост
                    </div>
                }
                <PostCard posts={posts} user={user}/>
            </div>
        </>
    );
};

export default BlogPostsPage;
