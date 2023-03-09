import React, {FC} from 'react';
import {ICollection} from "../../types/types";


interface CollectionProps {
  collection: ICollection[]
}

const Collection: FC<CollectionProps> = ({ collection}) => {

  if (!collection) return null
  return (
    <>
      {collection.map((title: ICollection) =>
        <div key={title.id} className={'bg-neutral-700 p-4 rounded-lg'}>
          <div className={'flex xs:flex-col md:flex-row gap-4'}>
            <img className={'rounded-lg w-[200px] h-fit self-center'} src={title.image} alt="Изображение тайтла"/>
            <div className={'flex flex-col'}>
              <span>{title.title_ru} / {title.title_original}</span>
              {title.links.map((link, index) => <a key={link.link}
                                                   href={link.link}
                                                   target={"_blank"}>Ссылка {index + 1}</a>)}
              <div className={'text-neutral-300'}>
                <h3 className={'mt-4 font-bold'}>Информация</h3>
                <div className={'flex flex-col'}>
                  <span>Год выпуска: {title.announce_date}</span>
                  <span>Жарны: {title.tags.map(tag => tag.name + ' ')}</span>
                  <span>Эпизоды: {title.episodes}</span>
                  <span>Длительность серии: {title.episode_time}</span>
                  <span>Студия: {title.studio}</span>
                  <span>Цензура: {title.censure ? 'С цензурой' : 'Без цензуры'}</span>
                </div>
                <h3 className={'mt-4 font-bold'}>Описание</h3>
                <p>{title.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
