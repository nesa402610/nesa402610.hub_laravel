import React, {FC} from 'react';
import BgCard from "../bgCard";
import moment from "moment/moment";
import {IPost, IUser} from "../../types/types";
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {MdVisibilityOff} from "react-icons/md";
import {useDispatch} from "react-redux";
import {setModalAction} from "../../store/reducers/modalReducer";
import PostForm from "../admin/PostForm";
import axios from "axios";
import {deletePostActions} from "../../store/reducers/blogReducer";


interface PostCardProps {
    posts: IPost[]
    user: IUser
}

const PostCard: FC<PostCardProps> = ({posts, user}) => {
    const dispatch = useDispatch()
    const editPostHandler = (post) => {
        dispatch(setModalAction({
            title: 'Редактирование',
            children: <PostForm post={post}/>
        }))
    }

    const deletePost = (id) => {
        axios.post('/admin/deleteBlogPost', {id})
            .then(() => {
                dispatch(deletePostActions(id))
            })
            .catch(err => alert(err))
    };

    if (posts) return (
        <>
            {posts?.map(post =>
                <BgCard key={post.id}
                        className={'min-h-[250px] group drop-shadow-xl sm:flex-col xs:justify-start'}>
                    {user?.id == 1 &&
                        <div className={'flex group-hover:opacity-100 opacity-0 transition-all flex-col absolute gap-2 right-0 mr-4 text-xl'}>
                            <span className={'flex hover:scale-125 cursor-pointer'}
                                  onClick={() => editPostHandler(post)}>
                                <RiEditFill/>
                            </span>
                            <span className={'flex hover:scale-125 cursor-pointer'}>
                                <MdVisibilityOff/>
                            </span>
                            <span className={'flex hover:scale-125 cursor-pointer text-rose-500'}
                                  onClick={() => deletePost(post.id)}
                            >
                                <RiDeleteBin6Fill/>
                            </span>
                        </div>}
                    <div className={'flex justify-between gap-2'}>
                        <span
                            className={'font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'}>
                            {post.title}
                        </span>
                    </div>
                    <div className={'flex-1'}>
                        {post.body}
                    </div>
                    <div className={'flex justify-end'}>
                        <span>{moment(post.created_at).format('DD.MM.YYYY')}</span>
                    </div>
                </BgCard>
            )}
        </>
    );
};

export default PostCard;
