import React from 'react';
import {useParams} from "react-router";
import moment from "moment";
import {BiTime} from "react-icons/bi";
import {useGetPostByIdQuery} from "services/postService";
import PostComments from "components/blog/PostComments";
import Loader from "components/Loader";
import usePageTitle from "hooks/usePageTitle";

const BlogPostPage = () => {
    const {id} = useParams()
    const {data: post, isLoading} = useGetPostByIdQuery(id)

    usePageTitle(post?.title)
    if (isLoading) return <Loader/>

    return (
        <div className={'m-4 flex flex-col gap-4'}>
            <div className={'block--light sm:flex-col'}>
                <h1 className={'font-bold'}>{post?.title}</h1>
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
            <PostComments postId={+id}/>
        </div>
    );
};

export default BlogPostPage;
