import React, {FC} from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import axios from "axios";

interface CommentEditProps {
    id: number
    setIsEdit: any
    body: string
    setComment: any
}

const CommentEdit: FC<CommentEditProps> = ({id, setIsEdit, body, setComment}) => {
    const editComment = (e, id) => {
        setIsEdit(id)
        setComment(body)
        // axios.post('/blog/comments/edit')
    }
    const deleteComment = (e, id) => {
        axios.post('/blog/comments/delete', {id})
            .then(r => alert(r.data))
    }
    return (
        <div className={'absolute right-0 mr-4 flex gap-2'}>
            <span onClick={event => editComment(event, id)}
                  className={'hover:scale-125 cursor-pointer'}><RiEditFill/></span>
            <span onClick={e => deleteComment(e, id)}
                  className={'hover:scale-125 cursor-pointer text-rose-500'}><RiDeleteBin6Fill/></span>
        </div>
    );
};

export default CommentEdit;
