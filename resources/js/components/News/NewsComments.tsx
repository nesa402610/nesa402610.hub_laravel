import React, {FC} from 'react';
import {useGetPostCommentsQuery} from "services/NewsService";
import Loader from "components/Loader";
import NewsComment from "components/News/Comment/NewsComment";
import CreateComment from "components/News/CreateComment";

interface BlogCommentsProps {
    postId: number
}

const NewsComments: FC<BlogCommentsProps> = ({postId}) => {
    const {data: comments, isLoading, isFetching} = useGetPostCommentsQuery(postId)
    if (isLoading) return <Loader/>
    return (
        <>
            {(comments.length && !isLoading) ? comments.map(comment =>
                    <NewsComment key={comment.id} comment={comment}/>
                ) :
                <h3 className={'font-bold text-center text-neutral-300'}>Кажется, комментариев нет. Может будешь
                    первым?</h3>
            }
            {(isFetching) && <Loader/>}
            <CreateComment postId={postId}/>
        </>
    );
};

export default NewsComments;
