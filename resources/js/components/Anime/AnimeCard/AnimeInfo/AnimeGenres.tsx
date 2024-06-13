import React, {FC} from "react";
import {useRemoveTagMutation} from "services/Collections/AnimeService";
import {ICollectionTag} from "types/Tag";
import AdminTagSelector from "components/Anime/AnimeCard/AdminTagSelector";
import AdminChecker from "components/AdminChecker";
import Bauble from "components/UI/Bauble";

interface HCollectionGenresProps {
    genres: ICollectionTag[]
    collectionID: number
}


const AnimeGenres: FC<HCollectionGenresProps> = ({genres, collectionID}) => {
    const [removeTag] = useRemoveTagMutation();

    const deleteTagHandler = (titleId: number, tagId: number) => {
        removeTag({titleId, tagId, tagType: 'genre'});
    };
    return (
        <span className={"flex gap-1 md:flex-nowrap xs:flex-wrap"}>
            Жанры:
            <div className={"flex gap-1 flex-wrap"}>
                {genres?.map((genre: ICollectionTag) =>
                    <Bauble key={genre.tag_id}
                            className={(genre.name === "Золото" ? "bg-amber-400 text-neutral-600" : genre.name === "Серебро" ? "bg-zinc-500" : genre.name === "Медь" ? "bg-amber-700" : "bg-neutral-800") + " rounded-full flex items-center"}>
                        <span className={"whitespace-nowrap"}>{genre.name}</span>
                        <AdminChecker>
                            <span onClick={() => deleteTagHandler(collectionID, genre.tag_id)}
                                  className={"cursor-pointer ml-2 px-1 bg-neutral-700 text-white rounded-full leading-none text-inherit"}>
                                  -
                            </span>
                        </AdminChecker>
                    </Bauble>
                )}
                <AdminTagSelector collectionID={collectionID} items={genres} type={'genre'}/>
                </div>
        </span>
    );
};

export default AnimeGenres;
