import React, {FC} from 'react';
import {useGetPostCommentsQuery} from "services/postService";
import Loader from "components/Loader";
import BlogComment from "components/blog/Comment/BlogComment";
import CreateComment from "components/blog/CreateComment";

interface BlogCommentsProps {
    postId: number
}

const PostComments: FC<BlogCommentsProps> = ({postId}) => {
    const {data: comments, isLoading, isFetching} = useGetPostCommentsQuery(postId)
    if (isLoading) return <Loader/>
    return (
        <>
            {(comments.length && !isLoading) ? comments.map(comment =>
                    <BlogComment key={comment.id} comment={comment}/>
                ) :
                <h3 className={'font-bold text-center text-neutral-300'}>Кажется, комментариев нет. Может будешь
                    первым?</h3>
            }
            {(isFetching) && <Loader/>}
            <CreateComment postId={postId}/>
        </>
    );
};

export default PostComments;
