import React, {FC, useState} from 'react';
import moment from "moment/moment";
import {BiTime} from "react-icons/bi";
import PostForm from "../admin/PostForm";
import {IPost} from "types/Post";
import ContextMenu from "components/UI/ContextMenu/ContextMenu";
import {useChangeVisibilityMutation, useDeletePostMutation} from "services/postService";
import useDropdown from "hooks/useDropdown";
import AdminChecker from "components/AdminChecker";

interface PostCardProps {
    post: IPost
}

const PostCard: FC<PostCardProps> = ({post}) => {
    const [deletePost, {}] = useDeletePostMutation()
    const [changeVisibility, {}] = useChangeVisibilityMutation()
    const {isOpen, toggleHandle, setIsOpen, nav, pos, link} = useDropdown()
    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <>
            <PostForm isModal={isModal} setIsModal={setIsModal} post={post}/>
            {isOpen &&
                <ContextMenu contextMenu={isOpen} setContextMenu={setIsOpen} position={pos}
                             deleteFn={() => deletePost(post.id)} link={link}
                >
                    <AdminChecker>
                        <li onClick={() => setIsModal(true)}>Редактировать</li>
                        <li onClick={() => changeVisibility(post.id)}>{post.visibility ? 'Показать пост' : 'Скрыть пост'}</li>
                    </AdminChecker>
                </ContextMenu>
            }
            <div onClick={() => nav(`${post.id}`)} key={post.id}
                 onContextMenu={(e) => toggleHandle(e, `${post.id}`)}>
                <div
                    className={'flex h-[230px] transition-all cursor-pointer hover:-translate-y-2 drop-shadow-xl group flex-col xs:justify-start' + (post.visibility ? ' brightness-150 block--dark opacity-30' : ' block--light')}>
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
            </div>
        </>
    );
};

export default PostCard;
