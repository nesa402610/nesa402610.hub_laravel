import React from 'react';
import {useParams} from "react-router";
import moment from "moment";
import {BiTime} from "react-icons/bi";
import {useGetPostByIdQuery} from "services/postService";
import BlogComments from "components/blog/BlogComments";
import Loader from "components/Loader";

const BlogPostPage = () => {
    const {id} = useParams()
    const {data: post, isLoading} = useGetPostByIdQuery(id)

    if (isLoading) return <Loader/>

    return (
        <div className={'m-4 flex flex-col gap-4'}>
            <div className={'block--light sm:flex-col'}>
                <div>{post?.title}</div>
                <div>
                    {post?.body}
                </div>
                <div className={'flex justify-end'}>
                        <span className={'flex items-center gap-1'}>
                            {moment(post?.created_at).format('DD.MM.YYYY')}
                            <BiTime className={'text-lg'}/>
                        </span>
                </div>
            </div>
            <h2 className={'text-xl font-bold text-center'}>Комментарии</h2>
            <BlogComments postId={+id}/>
        </div>
    );
};

export default BlogPostPage;
