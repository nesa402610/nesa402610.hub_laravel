import React, {FC} from "react";
import Filter from "components/Anime/filter/Filter";
import AnimeList from "components/Anime/AnimeList";
import {useAppSelector} from "hooks/redux";

// export const filterCollection = (collections, filter) => {
//     const filteredByTitle = collections?.data.filter(c => c.title_ru.toLowerCase().includes(filter.title.toLowerCase()));
//     return filteredByTitle?.filter(item => {
//         return filter.tags.every(tf => item.tags?.map(it => it.name).includes(tf));
//     });
// };
const AnimePage: FC = () => {
    const {smallPreview} = useAppSelector(state => state.collection.options)

    return (
        <div className={"m-4"}>
            <div className={"bg-neutral-800 rounded-lg pt-4 flex flex-col gap-4 mt-4"}>
                <div className={'p-4'}>
                    <h1 className={"text-center font-bold text-2xl"}>Добро пожаловать в зону души!</h1>
                    <h3 className={"text-sm text-neutral-500 italic text-end mr-2"}>
                        Я не при делах если что. Все данные взяты с открытых источников.
                    </h3>
                </div>
                <div className={"gap-4 flex xs:flex-col md:flex-row"}>
                    <Filter/>
                    <AnimeList smallPreview={smallPreview}/>
                </div>
            </div>
        </div>
    );
};

export default AnimePage;
