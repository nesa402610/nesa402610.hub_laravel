import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import BgCard from "../components/bgCard";
import axios from "axios";
import {setPostsActions} from "../store/reducers/blogReducer";
import {useDispatch} from "react-redux";
import {setModalAction} from "../store/reducers/modalReducer";
import PostForm from "../components/admin/PostForm";
import moment from "moment";

const BlogPage: FC = () => {
    const dispatch = useDispatch()
    const {user} = useTypedSelector(state => state.auth)
    const {posts} = useTypedSelector(state => state.posts)
    useEffect(() => {
        axios.get('/blog')
            .then(r => dispatch(setPostsActions(r.data)))
    }, [])
    const createPost = () => {
        dispatch(setModalAction({title: 'asd', children: <PostForm/>}))
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
                        {posts?.map(post =>
                            <BgCard key={post.id}
                                    className={'min-h-[250px] drop-shadow-xl sm:flex-col xs:justify-start'}>
                                <div className={'flex justify-between gap-2'}>
                                    <span className={'font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'}>{post.title}</span>
                                    {moment(post.created_at).format('DD.MM.YYYY')}
                                </div>
                                <div>
                                    {post.body}
                                </div>
                            </BgCard>
                        )}
                    </div>
                </>

            }
        </section>
    );
}

export default BlogPage;
