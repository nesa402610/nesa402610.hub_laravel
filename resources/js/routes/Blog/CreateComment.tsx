import React, {FC, useState} from 'react';
import {IPost} from "../../types/types";
import {useGetUserQuery} from "../../services/userService";
import {useCreateCommentMutation} from "../../services/postService";

interface CreateCommentProps {
  handler?: any
  post: IPost
}

const CreateComment: FC<CreateCommentProps> = ({post}) => {
  const {data: isAuth} = useGetUserQuery('')
  const [createComment, {}] = useCreateCommentMutation()
  const [comment, setComment] = useState('');

  const createCommentHandler = (e) => {
    e.preventDefault()
    if (comment.length >= 10) {
      createComment({postId: post.id, comment})
      setComment('')
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
