import React, {FC, useState} from 'react';
import moment from "moment/moment";
import {BiTime} from "react-icons/bi";
import PostCardAdmin from "./PostCard__admin";
import {Link} from "react-router-dom";
import PostForm from "../admin/PostForm";
import {IPost} from "types/Post";
import {IUser} from "types/User";
import ContextMenu from "components/UI/ContextMenu";

interface PostCardProps {
    post: IPost
    user: IUser
}

const PostCard: FC<PostCardProps> = ({post, user}) => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(null);
    const dropdownHandle = (e) => {
        e.preventDefault()
        setCursorPosition({x: e.clientX, y: e.clientY});
        setIsContextMenu(true)
    }

    return (
        <>
            <PostForm isModal={isModal} setIsModal={setIsModal} post={post}/>
            <ContextMenu isContextMenu={isContextMenu} setIsContextMenu={setIsContextMenu}
                         cursorPosition={cursorPosition}/>
            <Link to={`${post.id}`} key={post.id} onContextMenu={e => dropdownHandle(e)}>
                <div
                    className={'flex h-[250px] transition-all cursor-pointer hover:-translate-y-2 drop-shadow-xl flex-col xs:justify-start' + (post.visibility ? ' brightness-150 block--dark opacity-30' : ' block--light')}>
                    {user?.id == 1 &&
                        <PostCardAdmin post={post} setIsModal={setIsModal}/>
                    }
                    <div className={'flex justify-between gap-2'}>
                        <span className={'font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'}>
                    {post.title}
                        </span>
                    </div>
                    <div className={'flex-1 overflow-ellipsis'}>
                        {post.body.length > 130 ?
                            post.body.substring(0, 130) + '....'
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
