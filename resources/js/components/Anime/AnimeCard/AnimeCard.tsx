import React, {FC} from "react";
import Title from "./Title";
import {ICollection} from "types/types";
import AnimeDescription from "./AnimeDescription";
import AnimeInfo from "components/Anime/AnimeCard/AnimeInfo/AnimeInfo";
import {useGetUserQuery} from "services/userService";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";
import AnimeTags from "components/Anime/AnimeCard/AnimeTags/AnimeTags";
import AnimeUserStatus from "components/Anime/AnimeCard/AnimeUserStatus";
import Image from "components/Anime/AnimeCard/Image";
import {setError} from "store/reducers/errorSlice";
import {useAppDispatch} from "hooks/redux";

interface CollectionProps {
    collection: ICollection;
    link?: boolean;
    admin?: boolean
    description?: boolean
}

const AnimeCard: FC<CollectionProps> = ({collection, link = false, admin = false, description = true}) => {
    const {data: user} = useGetUserQuery()
    const isAdmin = user?.role[0]?.name === 'Admin'
    const dispatch = useAppDispatch();


    const fetchAnime = async () => {
        try {
            const response = await fetch('https://shikimori.one/api/animes/' + collection.shiki_id)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // .then(r => r.json())
            // .then(r => {
            //     if (r.id) {
            //         fetch('/api/anime/newByShiki', {
            //             headers: {
            //                 'X-CSRF-TOKEN': csrf_token,
            //                 'Content-Type': 'application/json'
            //             },
            //             method: 'post',
            //             body: JSON.stringify(r),
            //         })
            //     }
            // })
            // .catch(e => {
            //     alert(1)
            //     dispatch(setError('Нет shiki_id'));
            //
            // })
        } catch (e) {
            // alert(1)
            dispatch(setError('Нет shiki_id'));
        }

        return
    }

    if (!collection) return null;

    const path = admin ? `${collection.id}` : `/NULL/unit/ZERO/${collection.id}`
    return (
        <div className={"relative bg-neutral-700 p-4 rounded-lg"}>
            {isAdmin &&
                <div className={'absolute right-4 hover:scale-110 transition-all'}>
                    <Link to={`/admin/anime/${collection.id}`}
                          className={'flex flex-col items-center text-neutral-300'}>
                        <FiEdit size={'1.5rem'}/>
                    </Link>
                    <span onClick={fetchAnime}>refresh</span>
                </div>
            }
            <div className={"flex flex-col gap-4"}>
                <div className={'flex xs:flex-col md:flex-row gap-4'}>
                    <div className={'flex flex-col gap-2'}>
                        <Image link={link} path={path} image={collection.image}/>
                        <AnimeUserStatus link={link} path={path} anime={collection}/>
                    </div>
                    <div className={"flex flex-col w-full"}>
                        <Title path={path} link
                               RU={collection.title_ru}
                               EN={collection.title_en}
                               ORIGINAL={collection.title_original}/>
                        <AnimeInfo collection={collection}/>
                        {description && <AnimeDescription description={collection.description}/>}
                    </div>
                </div>
                <AnimeTags collectionID={collection.id} collectionTags={collection.tags}/>
            </div>
        </div>
    );
};

export default AnimeCard;
