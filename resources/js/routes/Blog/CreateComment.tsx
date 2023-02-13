import React, {FC, useState} from 'react';
import {useAppDispatch} from "../../hooks/redux";
import {IPost} from "../../types/types";
import axios from "axios";
import {addComment} from "../../store/reducers/blogSlice";
import {useGetUserQuery} from "../../services/userService";

interface CreateCommentProps {
    handler?: any
    post: IPost
}

const CreateComment: FC<CreateCommentProps> = ({post}) => {
    const {data: isAuth} = useGetUserQuery('')
    const [comment, setComment] = useState('');
    const dispatch = useAppDispatch()

    const createCommentHandler = (e) => {
        e.preventDefault()
        if (comment.length >= 10) {
            axios.post('blog/commentCreate', {post_id: post.id, body: comment})
                .then(r => {
                    dispatch(addComment(r.data))
                    setComment('')
                })
                .catch(err => alert(err))
        }
    }
    return (
        <>
            {isAuth && post &&
                <div className={'block--light flex gap-4 sm:flex-col'}>
                   <textarea className={'invalid:border-red-700 invalid:border p-4 bg-stone-500 rounded-lg w-full outline-none'}
                             minLength={10}
                             placeholder={'Оставить комментарий'}
                             onChange={e => setComment(e.target.value)}
                             value={comment}
                   />
                    <button className={'self-end bg-stone-500 hover:bg-stone-700 px-6'}
                            onClick={e => createCommentHandler(e)}
                    >Отправить
                    </button>
                </div>
            }
        </>
    );
};

export default CreateComment;
