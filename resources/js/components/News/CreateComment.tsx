import React, {FC, useRef, useState} from 'react';
import {useGetUserQuery} from "services/userService";
import {useCreateCommentMutation} from "services/NewsService";
import BBCode from "components/UI/BBCode";

interface CreateCommentProps {
    postId: number
}

const CreateComment: FC<CreateCommentProps> = ({postId,}) => {
    const {data: isAuth} = useGetUserQuery()
    const [createComment] = useCreateCommentMutation()
    const [comment, setComment] = useState('');
    const ref = useRef(null)

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
                <div className={'block--light flex gap-4 flex-col'}>
                    <BBCode refer={ref} setComment={setComment}/>
                    <textarea
                        className={'invalid:border-red-700 invalid:border p-4 bg-neutral-500 rounded-lg w-full outline-none'}
                        ref={ref}
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
