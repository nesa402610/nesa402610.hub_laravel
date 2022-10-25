import React, {FC} from 'react';
import BgCard from "../bgCard";
import moment from "moment/moment";
import {IPost, IUser} from "../../types/types";
import {BiTime} from "react-icons/bi";
import PostCardAdmin from "./PostCard__admin";


interface PostCardProps {
    posts: IPost[]
    user: IUser
}

const PostCard: FC<PostCardProps> = ({posts, user}) => {

    if (posts) return (
        <>
            {posts?.map(post => (post.visibility === 0 || user?.id === 1) &&
                <BgCard key={post.id}
                        className={'h-[250px] group drop-shadow-xl sm:flex-col xs:justify-start'}>
                    {user?.id == 1 &&
                        <PostCardAdmin post={post}/>
                    }
                    <div className={'flex justify-between gap-2'}>
                        <span
                            className={'font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'}>
                    {post.title}
                        </span>
                    </div>
                    <div className={'flex-1 overflow-ellipsis'}>
                        {post.body.substring(0, 196) + '....'}
                    </div>
                    <div className={'flex justify-end'}>
                        <span className={'flex items-center gap-1'}>
                            {moment(post.created_at).format('DD.MM.YYYY')}
                            <BiTime className={'text-lg'}/>
                        </span>
                    </div>
                </BgCard>
            )}
        </>
    );
};

export default PostCard;
