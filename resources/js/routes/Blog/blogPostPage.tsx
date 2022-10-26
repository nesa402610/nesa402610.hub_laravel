import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {IPost} from "../../types/types";
import {useAppSelector} from "../../hooks/redux";
import BgCard from "../../components/bgCard";
import moment from "moment";
import {BiTime} from "react-icons/bi";

const BlogPostPage = () => {
    const params = useParams()
    const [post, setPost] = useState<IPost>(null);
    const {posts} = useAppSelector(state => state.posts)
    useEffect(() => {
        setPost(posts.filter(p => p.id == params.id)[0])
    }, [posts])
    return (
        <div className={'mx-4'}>
            <BgCard className={'sm:flex-col'}>
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
            </BgCard>
        </div>
    );
};

export default BlogPostPage;
