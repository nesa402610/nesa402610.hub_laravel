import React, {FC} from 'react';
import {useGetRandomAnimeListQuery} from "services/Collections/AnimeService";
import HCollectionCardMini from "components/HCollection/CollectionCard/HCollectionCardMini";
import ChatPage from "routes/ChatPage";
import {useGetPostsQuery} from "services/postService";
import PostCard from "components/blog/PostCard";

const HomePage: FC = () => {
    const {data: randomList, refetch} = useGetRandomAnimeListQuery();
    const {data: posts} = useGetPostsQuery(1)
    return (
        <div className={'flex flex-col m-4 gap-4'}>
            <div className={'lg:grid lg:grid-cols-4 xs:flex xs:flex-col gap-4'}>
                <div className={'col-span-3  block--dark'}>
                    <div className={'flex justify-between'}>
                        <h2 className={'font-bold'}>Случайные аниме</h2>
                        <span onClick={refetch} className={'cursor-pointer'}>Обновить</span>
                    </div>
                    <div className={'grid md:grid-cols-5 xs:grid-cols-2 sm:grid-cols-4 gap-4 mt-4'}>
                        {randomList?.map(anime =>
                            <HCollectionCardMini anime={anime}/>
                        )}
                    </div>
                </div>
                <div className={'-ml-4 flex-1'}>
                    <ChatPage height={'h-[700px]'}/>
                </div>
            </div>
            <div className={'block--dark'}>
                <h3 className={'font-bold mb-4'}>Новости сайта</h3>
                <div className={'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
                    {posts?.data.map(post =>
                            <PostCard post={post}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
