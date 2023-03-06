import React, {useState} from 'react';
import PostCard from "../../components/blog/PostCard";
import PostForm from "../../components/admin/PostForm";
import {useGetUserQuery} from "../../services/userService";
import {useGetPostsQuery} from "../../services/postService";
import Loader from "../../components/Loader";

const BlogPostsPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const {data: user} = useGetUserQuery('')
  const {data: posts, isLoading} = useGetPostsQuery('')

  const createPost = () => {
    setIsModal(true)
  }
  if (isLoading) return <Loader/>
  return (
    <>
      <PostForm isModal={isModal} setIsModal={setIsModal}/>
      <h1 className={'text-center text-3xl mb-8 font-bold'}>Посты</h1>
      <div className={'px-4 gap-4 grid sm:grid-cols-4 xs:grid-cols-1'}>
        {user?.id === 1 &&
          <div className={'block--light'} onClick={createPost}>
            Новый пост
          </div>
        }
        {posts?.map(post => (post.visibility === 0 || user?.id === 1) &&
          <PostCard key={post.id} post={post} user={user}/>
        )}
      </div>
    </>
  );
};

export default BlogPostsPage;
