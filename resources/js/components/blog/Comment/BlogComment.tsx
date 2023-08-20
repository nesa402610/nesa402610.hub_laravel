import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {IComment} from "types/Post";
import Comment from 'components/blog/Comment/Comment'
import CommentEdit from "components/blog/Comment/Comment__edit";

interface BlogCommentProps {
    comment: IComment
}

const BlogComment: FC<BlogCommentProps> = ({comment: commentData}) => {
    const [comment, setComment] = useState<string>(commentData.body);
    const [isEdit, setIsEdit] = useState(false);


    return (
        <div key={commentData.id} className={'block--light sm:flex-col relative'}>
            <CommentEdit id={commentData.id}
                         userId={commentData.user_id}
                         postId={commentData.post_id}
                         setIsEdit={setIsEdit}/>
            <div className={'flex gap-4 items-center'}>
                <Link to={'/profile/' + commentData.user_id}
                      className={'hover:text-stone-400 transition-colors'}
                >
                    <span>#{commentData.id}&nbsp;</span>
                    <span>{commentData.user.name}&nbsp;</span>
                    <span>{commentData.user.lastName}</span>
                </Link>
                {
                    (commentData.created_at != commentData.updated_at) &&
                    <span className={'italic text-stone-500'}>изменен</span>
                }
            </div>
            <div>
                <Comment comment={comment} setComment={setComment}
                         id={commentData.id} isEdit={isEdit} setIsEdit={setIsEdit}/>
            </div>
        </div>
    );
};

export default BlogComment;
