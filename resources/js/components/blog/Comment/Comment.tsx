import React, {FC, SetStateAction, useRef} from 'react';
import {parseBbCode} from "../../../helpers/BBParser";
import {useUpdateCommentMutation} from "services/postService";
import BBCode from "../../UI/BBCode";

interface CommentProps {
    comment: string
    setComment: React.Dispatch<SetStateAction<string>>
    id: number
    isEdit: boolean
    setIsEdit: React.Dispatch<SetStateAction<boolean>>
}

const Comment: FC<CommentProps> = ({comment, setComment, id, isEdit, setIsEdit}) => {
    const ref = useRef(null)
    const [updateComment, {}] = useUpdateCommentMutation()
    const saveComment = (id) => {
        updateComment({id, comment})
            .unwrap()
            .then(() => setIsEdit(false))
            .catch(err => console.log(err))
    };
    return (
        <>
            {isEdit ?
                <div className={'flex flex-col gap-4'}>
                    <BBCode refer={ref} setComment={setComment}/>
                    <input className={'bg-neutral-600'}
                           type={'text'} ref={ref}
                           value={comment}
                           onChange={e => setComment(e.target.value)}/>
                    <button onClick={() => saveComment(id)}>Сохранить</button>
                </div>
                :
                <div>
                    {parseBbCode(comment)}
                </div>
            }
        </>

    );
};

export default Comment;
