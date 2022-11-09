import React from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {setModal} from "../../store/reducers/modalSlice";
import PostForm from "../admin/PostForm";
import axios from "axios";
import {deletePost, editPost} from "../../store/reducers/blogSlice";
import {useAppDispatch} from "../../hooks/redux";

const PostCardAdmin = ({post}) => {
    const dispatch = useAppDispatch()
    const editPostHandler = (e, post) => {
        e.preventDefault()
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
    return (
        <div className={'flex group-hover:opacity-100 opacity-0 transition-all flex-col absolute gap-2 right-0 mr-4 text-xl'}>
            <span className={'flex hover:scale-125 cursor-pointer'}
                  onClick={(e) => editPostHandler(e, post)}>
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
        </div>
    );
};

export default PostCardAdmin;
