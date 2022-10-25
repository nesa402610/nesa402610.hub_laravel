import React, {FC} from 'react';
import BgCard from "../bgCard";
import moment from "moment/moment";
import {IPost, IUser} from "../../types/types";
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {useDispatch} from "react-redux";
import PostForm from "../admin/PostForm";
import axios from "axios";
import {BiTime} from "react-icons/bi";
import {deletePost, editPost} from "../../store/reducers/blogSlice";
import {setModal} from "../../store/reducers/modalSlice";


interface PostCardProps {
    posts: IPost[]
    user: IUser
}

const PostCard: FC<PostCardProps> = ({posts, user}) => {
    const dispatch = useDispatch()
    const editPostHandler = (post) => {
        dispatch(setModal({
            title: 'Редактирование',
            children: <PostForm post={post}/>
        }))
    }
    const visibilityChange = (id) => {
        axios.post('/admin/visibilityBlogPost', {id})
            .then((r) => {
                dispatch(editPost(r.data))
            })
            .catch(err => alert(err))
    };
    const deletePostHandler = (post) => {
        axios.post('/admin/deleteBlogPost', {id: post.id})
            .then(() => {
                dispatch(deletePost(post))
            })
            .catch(err => alert(err))
    };

    if (posts) return (
        <>
            {posts?.map(post => (post.visibility === 0 || user?.id === 1) &&
                <BgCard key={post.id}
                        className={'min-h-[250px] group drop-shadow-xl sm:flex-col xs:justify-start'}>
                    {user?.id == 1 &&
                        <div className={'flex group-hover:opacity-100 opacity-0 transition-all flex-col absolute gap-2 right-0 mr-4 text-xl'}>
                            <span className={'flex hover:scale-125 cursor-pointer'}
                                  onClick={() => editPostHandler(post)}>
                                <RiEditFill/>
                            </span>
                            <span className={'flex hover:scale-125 cursor-pointer'}
                                  onClick={() => visibilityChange(post.id)}
                            >
                                {!post.visibility ?
                                    <MdVisibilityOff/>
                                    :
                                    <MdVisibility/>
                                }
                                </span>
                            <span className={'flex hover:scale-125 cursor-pointer text-rose-500'}
                                  onClick={() => deletePostHandler(post)}
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
