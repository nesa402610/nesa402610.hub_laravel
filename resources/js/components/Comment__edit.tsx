import React, {FC} from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {useDeleteCommentMutation} from "../services/postService";

interface CommentEditProps {
    id: number
    postId: string
    setIsEdit: any
    body: string
    setComment: any
}

const CommentEdit: FC<CommentEditProps> = ({id, postId, setIsEdit, body, setComment}) => {
    const [deleteComment, {}] = useDeleteCommentMutation()
    const updateCommentHandler = () => {
        setIsEdit(id)
        setComment(body)
        // axios.post('/blog/comments/edit')
    }
    const deleteCommentHandler = () => {
        deleteComment({postId, id})
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
