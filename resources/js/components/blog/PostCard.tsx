import React, {FC} from 'react';
import moment from "moment/moment";
import {IPost, IUser} from "../../types/types";
import {BiTime} from "react-icons/bi";
import PostCardAdmin from "./PostCard__admin";
import {Link} from "react-router-dom";


interface PostCardProps {
    post: IPost
    user: IUser
}

const PostCard: FC<PostCardProps> = ({post, user}) => {
    return (
        <>
            <Link to={`${post.id}`} key={post.id}>
                <div
                    className={'block--light h-[250px] transition-all cursor-pointer hover:-translate-y-2 group drop-shadow-xl sm:flex-col xs:justify-start'}>
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
                        {post.body.length > 180 ?
                            post.body.substring(0, 180) + '....'
                            : post.body
                        }
                    </div>
                    <div className={'flex justify-end'}>
                        <span className={'flex items-center gap-1'}>
                            {moment(post.created_at).format('DD.MM.YYYY')}
                            <BiTime className={'text-lg'}/>
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default PostCard;
