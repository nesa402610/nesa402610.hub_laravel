import React, {FC, useState} from 'react';
import CommentEdit from "../Comment__edit";
import {Link} from "react-router-dom";
import {IComment} from "../../types/Post";
import {useUpdateCommentMutation} from "../../services/postService";


interface BlogCommentProps {
    comment: IComment
}

const BlogComment: FC<BlogCommentProps> = ({comment: commentData}) => {
    const [updateComment, {}] = useUpdateCommentMutation()

    const [comment, setComment] = useState<IComment>(commentData);
    const [isEdit, setIsEdit] = useState<number>(0);

    const saveComment = (id) => {
        updateComment({id, comment: comment.body})
            .then(() => setIsEdit(0))
            .catch(err => console.log(err))
    };

    return (
        <div key={comment.id} className={'block--light sm:flex-col relative'}>
            <CommentEdit id={comment.id}
                         postId={comment.post_id}
                         setIsEdit={setIsEdit}/>
            <div className={'flex gap-4 items-center'}>
                <Link to={'/profile/' + comment.user_id}
                      className={'hover:text-stone-400 transition-colors'}
                >
                    <span>#{comment.id}&nbsp;</span>
                    <span>{comment.user.name}&nbsp;</span>
                    <span>{comment.user.lastName}</span>
                </Link>
                {
                    comment.created_at != comment.updated_at && <span className={'italic text-stone-500'}>изменен</span>
                }
            </div>
            <div>
                {isEdit !== comment.id ?
                    <div>
                        {comment.body}
                    </div>
                    :
                    <div className={'flex flex-col gap-4'}>
                        <input className={'bg-neutral-600'}
                               type={'text'}
                               value={comment.body}
                               onChange={e => setComment({...comment, body: e.target.value})}/>
                        <button onClick={() => saveComment(comment.id)}>Сохранить</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default BlogComment;
