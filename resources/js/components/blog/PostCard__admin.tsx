import React from 'react';
import {RiDeleteBin6Fill, RiEditFill} from "react-icons/ri";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {useChangeVisibilityMutation, useDeletePostMutation} from "../../services/postService";

const PostCardAdmin = ({post, setIsModal}) => {
  const [deletePost, {}] = useDeletePostMutation()
  const [changeVisibility, {}] = useChangeVisibilityMutation()
  const editPostHandler = (e) => {
    e.preventDefault()
    setIsModal(true)

  }
  const visibilityChange = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: number) => {
    e.preventDefault()
    changeVisibility(id)
  };
  const deletePostHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: number) => {
    e.preventDefault()
    deletePost(id)
  };
  return (
    <div className={'flex group-hover:opacity-100 opacity-0 transition-all flex-col absolute gap-2 right-0 mr-4 text-xl'}>
            <span className={'flex hover:scale-125 cursor-pointer'}
                  onClick={(e) => editPostHandler(e)}>
                <RiEditFill/>
            </span>
      <span className={'flex hover:scale-125 cursor-pointer'}
            onClick={(e) => visibilityChange(e, post.id)}>
                {!post.visibility ?
                  <MdVisibilityOff/> : <MdVisibility/>
                }
      </span>
      <span className={'flex hover:scale-125 cursor-pointer text-rose-500'}
            onClick={(e) => deletePostHandler(e, post.id)}>
                <RiDeleteBin6Fill/>
      </span>
    </div>
  );
};

export default PostCardAdmin;
