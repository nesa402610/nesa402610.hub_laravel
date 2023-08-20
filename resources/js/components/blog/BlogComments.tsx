import React, {FC} from 'react';
import BlogComment from "./BlogComment";
import {useGetPostCommentsQuery} from "services/postService";
import CreateComment from "../../routes/Blog/CreateComment";
import Loader from "../Loader";

interface BlogCommentsProps {
    postId: number
}

const BlogComments: FC<BlogCommentsProps> = ({postId}) => {
    const {data: comments, isLoading} = useGetPostCommentsQuery(postId)
    if (isLoading) return <Loader/>
    return (
        <>
            {comments?.map(comment =>
                <BlogComment key={comment.id} comment={comment}/>
            )}
            <CreateComment
                postId={postId}
            />
        </>
    );
};

export default BlogComments;
