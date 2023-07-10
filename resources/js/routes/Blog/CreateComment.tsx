import React, {FC, useState} from 'react';
import {useGetUserQuery} from "../../services/userService";
import {useCreateCommentMutation} from "../../services/postService";

interface CreateCommentProps {
    handler?: any
    postId: number
}

const CreateComment: FC<CreateCommentProps> = ({postId}) => {
    const {data: isAuth} = useGetUserQuery(null)
    const [createComment, {}] = useCreateCommentMutation()
    const [comment, setComment] = useState('');

    const createCommentHandler = (e) => {
        e.preventDefault()
        if (comment.length >= 10) {
            createComment({postId, comment})
            setComment('')
        }
    }
    return (
        <>
            {isAuth &&
                <div className={'block--light flex gap-4 sm:flex-col'}>
                   <textarea
                       className={'invalid:border-red-700 invalid:border p-4 bg-neutral-500 rounded-lg w-full outline-none'}
                       minLength={10}
                       placeholder={'Оставить комментарий'}
                       onChange={e => setComment(e.target.value)}
                       value={comment}
                   />
                    <button className={'self-end px-6'}
                            onClick={createCommentHandler}
                    >Отправить
                    </button>
                </div>
            }
        </>
    );
};

export default CreateComment;
