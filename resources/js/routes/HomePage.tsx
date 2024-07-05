import React, {FC} from 'react';
import {useGetRandomAnimeListQuery} from "services/Anime/AnimeService";
import AnimeCard_mini from "components/Anime/AnimeCard/AnimeCard_mini";
import ChatPage from "routes/ChatPage";
import {useGetPostsQuery} from "services/NewsService";
import NewsCard from "components/News/NewsCard";
import {Link} from "react-router-dom";

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
                            <AnimeCard_mini key={anime.id} hideStatus anime={anime}/>
                        )}
                    </div>
                </div>
                <div className={'-ml-4 flex-1'}>
                    <ChatPage height={'h-[700px]'}/>
                </div>
            </div>
            <div className={'block--dark'}>
                <Link to={'news'} className={'font-bold hover:text-neutral-300'}>Новости сайта</Link>
                <div className={'grid xs:grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
                    {posts?.data.map(post =>
                        <NewsCard key={post.id} post={post}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
