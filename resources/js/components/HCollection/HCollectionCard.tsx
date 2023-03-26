import React, {FC, useState} from "react";
import {ICollection} from "../../types/types";
import {useGetUserQuery} from "../../services/userService";
import TagSelector from "./TagSelector";
import HCollectionTags from "./HCollectionTags";
import EditableSpan from "./EditableSpan";
import {Link} from "react-router-dom";


interface CollectionProps {
  collection: ICollection;
}

const HCollectionCard: FC<CollectionProps> = ({collection}) => {
  const {data: user} = useGetUserQuery("");
  const [tagDropDown, setTagDropDown] = useState(false);

  if (!collection) return null;

  return (
    <div className={"bg-neutral-700 p-4 rounded-lg"}>
      <div className={"flex xs:flex-col md:flex-row gap-4"}>
        <Link className={"contents"}
              to={`${collection.type === "anime" ? "a" : "m"}/${collection.id}`}>
          <img className={"rounded-lg w-[200px] h-fit self-center"}
               src={collection.image}
               alt="Изображение тайтла"/></Link>
        <div className={"flex flex-col"}>
          <Link to={`${collection.type === "anime" ? "a" : "m"}/${collection.id}`}>
            <div className={"flex items-center flex-wrap"}>
              <EditableSpan data={collection} datakey={"title_ru"}/>
              <span>&nbsp;/&nbsp;</span>
              <EditableSpan data={collection} datakey={"title_original"}/>
            </div>
          </Link>
          <div className={"text-neutral-300"}>
            <h3 className={"mt-4 font-bold"}>Информация</h3>
            <div className={"flex flex-col"}>
              <span>Год выхода: {collection.announce_date.slice(0, 4)}</span>
              <span className={"flex gap-1 md:flex-nowrap xs:flex-wrap"}>Жанры:
                    <div className={"flex gap-1 flex-wrap"}>
                      <HCollectionTags collection={collection}/>
                      {user?.id === 1 &&
                        <div onClick={() => setTagDropDown(prev => !prev)}
                             className={"bg-neutral-800 px-2 rounded-full relative"}>
                          +
                          {tagDropDown &&
                            <div onClick={e => e.stopPropagation()}
                                 className={"absolute p-2 rounded-lg h-[200px] overflow-scroll bg-neutral-800 flex flex-col gap-2"}>
                              <TagSelector collection={collection}/>
                            </div>
                          }
                        </div>}
                    </div>
                  </span>
              <div className={"flex items-center"}>
                <h4>Эпизоды:&nbsp;</h4>
                <EditableSpan data={collection} datakey={"episodes_released"}/>
                /
                <EditableSpan data={collection} datakey={"episodes_total"}/>
              </div>
              <div className={"flex"}>
                <h4>Длительность серии:&nbsp;</h4>
                <EditableSpan data={collection} datakey={"episode_time"}/>&nbsp;мин.
              </div>
              {collection.studios && <span>Студия: {collection.studios.map(studio => studio.name)}</span>}
              <span>Цензура: {collection.censure ? "С цензурой" : "Без цензуры"}</span>
            </div>
            <h3 className={"mt-4 font-bold"}>Описание</h3>
            <p>{collection.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCollectionCard;
