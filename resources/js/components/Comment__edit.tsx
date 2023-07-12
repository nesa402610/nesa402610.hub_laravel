import React, {FC} from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {useDeleteCommentMutation} from "../services/postService";
import {useGetUserQuery} from "../services/userService";

interface CommentEditProps {
    id: number
    userId: number
    postId: number
    setIsEdit: any
}

const CommentEdit: FC<CommentEditProps> = ({id, postId, userId, setIsEdit}) => {
    const {data: user} = useGetUserQuery()

    const [deleteComment, {}] = useDeleteCommentMutation()
    const updateCommentHandler = () => {
        setIsEdit(id)
    }
    const deleteCommentHandler = () => {
        deleteComment({postId, id})
    }
    if (userId !== user?.id) return null
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
