import React, {FC, useState} from 'react';
import {ICollection} from "../../types/types";
import {useGetUserQuery} from "../../services/userService";
import TagSelector from "./TagSelector";
import CollectionTags from "./CollectionTags";
import CollectionLinks from "./CollectionLinks";


interface CollectionProps {
  collection: ICollection
}

const Collection: FC<CollectionProps> = ({collection}) => {
  const {data: user} = useGetUserQuery('')
  const [tagDropDown, setTagDropDown] = useState(false);

  if (!collection) return null

  return (
    <div key={collection.id} className={'bg-neutral-700 p-4 rounded-lg'}>
      <div className={'flex xs:flex-col md:flex-row gap-4'}>
        <img className={'rounded-lg w-[200px] h-fit self-center'} src={collection.image} alt="Изображение тайтла"/>
        <div className={'flex flex-col'}>
          <span>{collection.title_ru} / {collection.title_original}</span>
          <CollectionLinks collection={collection}/>
          <div className={'text-neutral-300'}>
            <h3 className={'mt-4 font-bold'}>Информация</h3>
            <div className={'flex flex-col'}>
              <span>Год выпуска: {collection.announce_date}</span>
              <span className={'flex gap-1'}>Жанры:
                    <div className={'flex gap-1 flex-wrap'}>
                      <CollectionTags collection={collection}/>
                      {user?.id === 1 &&
                        <div onClick={() => setTagDropDown(prev => !prev)}
                             className={'bg-neutral-800 px-2 rounded-full relative'}>
                          +
                          {tagDropDown &&
                            <div onClick={e => e.stopPropagation()}
                                 className={'absolute p-2 rounded-lg h-[200px] overflow-scroll bg-neutral-800 flex flex-col gap-2'}>
                              <TagSelector collection={collection}/>
                            </div>
                          }
                        </div>}
                    </div>
                  </span>
              <span>Эпизоды: {collection.episodes_released}/{collection.episodes_total}</span>
              <span>Длительность серии: {collection.episode_time} мин.</span>
              <span>Студия: {collection.studio}</span>
              <span>Цензура: {collection.censure ? 'С цензурой' : 'Без цензуры'}</span>
            </div>
            <h3 className={'mt-4 font-bold'}>Описание</h3>
            <p>{collection.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
