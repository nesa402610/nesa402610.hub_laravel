import React, {FC} from "react";
import {useRemoveTagMutation} from "services/Anime/AnimeService";
import {IAnimeTag} from "types/Tag";
import AdminTagSelector from "components/Anime/AnimeCard/AdminTagSelector";
import AdminChecker from "components/AdminChecker";
import Bauble from "components/UI/Bauble";

interface HCollectionGenresProps {
    genres: IAnimeTag[]
    animeID: number
}


const AnimeGenres: FC<HCollectionGenresProps> = ({genres, animeID}) => {
    const [removeGenre] = useRemoveTagMutation();

    const deleteGenreHandler = (titleId: number, genreId: number) => {
        removeGenre({titleId, tagId: genreId, tagType: 'genre',});
        console.log(genres)
    };
    return (
        <span className={"flex gap-1 md:flex-nowrap xs:flex-wrap"}>
            Жанры:
            <div className={"flex gap-1 flex-wrap"}>
                {genres?.map((genre) =>
                    <Bauble key={genre.name}
                            className={(genre.name === "Золото" ? "bg-amber-400 text-neutral-600" : genre.name === "Серебро" ? "bg-zinc-500" : genre.name === "Медь" ? "bg-amber-700" : "bg-neutral-800") + " rounded-full flex items-center"}>
                        <span className={"whitespace-nowrap"}>{genre.name}</span>
                        <AdminChecker>
                            <span onClick={() => deleteGenreHandler(animeID, genre.genre_id)}
                                  className={"cursor-pointer ml-2 px-1 bg-neutral-700 text-white rounded-full leading-none text-inherit"}>
                                  -
                            </span>
                        </AdminChecker>
                    </Bauble>
                )}
                <AdminTagSelector collectionID={animeID} items={genres} type={'genre'}/>
                </div>
        </span>
    );
};

export default AnimeGenres;
