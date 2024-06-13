import React, {useState} from 'react';
import NewsCard from "components/News/NewsCard";
import PostForm from "components/admin/PostForm";
import {useGetUserQuery} from "services/userService";
import {useGetPostsQuery} from "services/NewsService";
import Loader from "components/Loader";
import Paginator from "components/UI/Paginator";

const BlogPostsPage = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isLoading} = useGetPostsQuery(currentPage)
    const {data: user} = useGetUserQuery()

    const createPost = () => {
        setIsModal(true)
    }
    if (isLoading) return <Loader/>
    return (
        <div className={'flex flex-col h-screen pb-4'}>
            <div className={'flex-1'}>
                <PostForm isModal={isModal} setIsModal={setIsModal}/>
                <h1 className={'text-center text-3xl mb-8 font-bold'}>Посты</h1>
                <div className={' px-4 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xs:grid-cols-1'}>
                    {(user?.id === 1 && currentPage === 1) &&
                        <div className={'h-[250px] block--light'} onClick={createPost}>
                            Новый пост
                        </div>
                    }
                    {data.data?.map(post => (post.visibility === 0 || user?.id === 1) &&
                        <NewsCard key={post.id} post={post}/>
                    )}
                </div>
            </div>
            <Paginator currentPage={data.current_page} setCurrentPage={setCurrentPage} totalPages={data.last_page}/>
        </div>
    );
};

export default BlogPostsPage;
