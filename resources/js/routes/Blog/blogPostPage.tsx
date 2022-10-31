import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {IPost} from "../../types/types";
import {useAppSelector} from "../../hooks/redux";
import BgCard from "../../components/bgCard";
import moment from "moment";
import {BiTime} from "react-icons/bi";
import CreateComment from "./CreateComment";
import {Link} from "react-router-dom";
import CommentEdit from "../../components/Comment__edit";

const BlogPostPage = () => {
    const params = useParams()
    const [post, setPost] = useState<IPost>(null);
    const {posts} = useAppSelector(state => state.posts)
    useEffect(() => {
        // @ts-ignore
        setPost(posts.filter(p => p.id == params.id)[0])
    }, [posts])

    return (
        <div className={'mx-4 flex flex-col gap-4'}>
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
            <h2 className={'text-xl font-bold text-center'}>Комментарии</h2>
            {post?.comments.map(c =>
                <BgCard key={c.id} className={'sm:flex-col relative'}>
                <CommentEdit id={c.id}/>
                    <div className={'flex'}>
                        <Link to={'/profile/' + c.user_id}
                              className={'hover:text-stone-400 transition-colors'}
                        >
                            <span>#{c.id}&nbsp;</span>
                            <span>{c.user.name}&nbsp;</span>
                            <span>{c.user.lastName}</span>
                        </Link>
                    </div>
                    <div>
                        {c.body}
                    </div>
                </BgCard>
            )}
            <CreateComment
                post={post}
            />
        </div>
    );
};

export default BlogPostPage;
