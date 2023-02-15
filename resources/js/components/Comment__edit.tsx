import React, {FC} from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {useDeleteCommentMutation} from "../services/postService";

interface CommentEditProps {
  id: number
  setIsEdit: any
  body: string
  setComment: any
}

const CommentEdit: FC<CommentEditProps> = ({id, setIsEdit, body, setComment}) => {
  const [deleteComment, {}] = useDeleteCommentMutation()
  const updateCommentHandler = () => {
    setIsEdit(id)
    setComment(body)
    // axios.post('/blog/comments/edit')
  }
  const deleteCommentHandler = () => {
    deleteComment({id})
  }
  return (
    <div className={'absolute right-0 mr-4 flex gap-2'}>
            <span onClick={updateCommentHandler}
                  className={'hover:scale-125 cursor-pointer'}><RiEditFill/></span>
      <span onClick={deleteCommentHandler}
            className={'hover:scale-125 cursor-pointer text-rose-500'}><RiDeleteBin6Fill/></span>
    </div>
  );
};

export default CommentEdit;
