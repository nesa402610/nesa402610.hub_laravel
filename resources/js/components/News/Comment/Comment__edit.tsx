import React, {FC, SetStateAction} from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {useDeleteCommentMutation} from "services/NewsService";
import {useGetUserQuery} from "services/userService";

interface CommentEditProps {
    id: number
    userId: number
    setIsEdit: React.Dispatch<SetStateAction<boolean>>
}

const CommentEdit: FC<CommentEditProps> = ({id, userId, setIsEdit}) => {
    const {data: user} = useGetUserQuery()
    const [deleteComment, {}] = useDeleteCommentMutation()

    if (userId !== user?.id) return null
    return (
        <div className={'absolute right-0 mr-4 flex gap-2'}>
            <span onClick={() => setIsEdit(prev => !prev)}
                  className={'hover:scale-125 cursor-pointer'}><RiEditFill/></span>
            <span onClick={() => deleteComment({id})}
                  className={'hover:scale-125 cursor-pointer text-rose-500'}><RiDeleteBin6Fill/></span>
        </div>
    );
};

export default CommentEdit;
