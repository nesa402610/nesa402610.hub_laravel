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
            {comments.map(comment =>
                <BlogComment key={comment.id} comment={comment}/>
            )}
            {(isFetching) && <Loader/>}
            <CreateComment postId={postId}/>
        </>
    );
};

export default PostComments;
