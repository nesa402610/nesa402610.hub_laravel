import React from 'react';
import PostCard from "../../components/blog/PostCard";
import {useAppDispatch} from "../../hooks/redux";
import {setModal} from "../../store/reducers/modalSlice";
import PostForm from "../../components/admin/PostForm";
import {useGetUserQuery} from "../../services/userService";
import {useGetPostsQuery} from "../../services/postService";

const BlogPostsPage = () => {
    const dispatch = useAppDispatch()
    const {data: user} = useGetUserQuery('')
    const {data: posts, isFetching} = useGetPostsQuery('')

    const createPost = () => {
        dispatch(setModal({title: 'Создание поста', children: <PostForm/>}))
    }
    if (isFetching) return <h2 className={'text-3xl font-bold text-center'}>Загружаем посты</h2>
    return (
        <>
            <h1 className={'text-center text-3xl mb-8 font-bold'}>Посты</h1>
            <div className={'px-4 gap-4 grid sm:grid-cols-4 xs:grid-cols-1'}>
                {user?.id === 1 &&
                    <div className={'block--light'} onClick={createPost}>
                        Новый пост
                    </div>
                }
                {posts?.map(post => (post.visibility === 0 || user?.id === 1) &&
                    <PostCard key={post.id} post={post} user={user}/>
                )}
            </div>
        </>
    );
};

export default BlogPostsPage;
