import React, {FC, useEffect} from 'react';
import BgCard from "../components/bgCard";
import axios from "axios";
import PostForm from "../components/admin/PostForm";
import PostCard from "../components/blog/PostCard";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setPosts} from "../store/reducers/blogSlice";
import {setModal} from "../store/reducers/modalSlice";

const BlogPage: FC = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const {posts} = useAppSelector(state => state.posts)
    useEffect(() => {
        axios.get('/blog')
            .then(r => dispatch(setPosts(r.data)))
    }, [])
    const createPost = () => {
        dispatch(setModal({title: 'Создание поста', children: <PostForm/>}))
    }
    return (
        <section>
            {!posts ?
                <h2 className={'text-3xl font-bold text-center'}>Ничего нет :(</h2>
                :
                <>
                    <h1 className={'text-center text-3xl mb-8 font-bold'}>Посты</h1>
                    <div className={'px-4 gap-4 grid sm:grid-cols-4 xs:grid-cols-1'}>
                        {user?.id === 1 &&
                            <BgCard onClick={createPost}>
                                Новый пост
                            </BgCard>
                        }
                        <PostCard posts={posts} user={user}/>
                    </div>
                </>

            }
        </section>
    );
}

export default BlogPage;
