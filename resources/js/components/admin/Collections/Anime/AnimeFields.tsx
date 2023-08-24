import React, {Dispatch, FC, SetStateAction} from "react";
import {ICollection} from "types/types";

interface AnimeFieldsProps {
    anime: ICollection;
    setAnime: Dispatch<SetStateAction<ICollection>>;
}

const AnimeFields: FC<AnimeFieldsProps> = ({anime, setAnime}) => {

    const setHandler = (e: React.ChangeEvent<any>, field: string) => {
        if (field === "censure") {
            setAnime({...anime, censure: e.target.checked});
        } else {
            setAnime({...anime, [field]: e.target.value});
        }
    };
    return (
        <div className={"flex flex-col"}>
            <label>
                <span>Название на русском *</span>
                <input type="text" value={anime.title_ru} onChange={e => setHandler(e, "title_ru")}/>
            </label>
            <label>
                <span>Название на английском *</span>
                <input type="text" value={anime.title_en} onChange={e => setHandler(e, "title_en")}/>
            </label>
            <label>
                <span>Оригинальное название *</span>
                <input type="text" value={anime.title_original} onChange={e => setHandler(e, "title_original")}/>
            </label>
            <label className={"flex flex-col"}>
                <span>Описание *</span>
                <textarea className={"rounded-lg bg-neutral-600 p-2"}
                          value={anime.description}
                          onChange={e => setHandler(e, "description")}/>
            </label>
            <label className={"flex flex-col"}>
                <span>Краткое описание</span>
                <textarea className={"rounded-lg bg-neutral-600 p-2"}
                          value={anime.description_short}
                          onChange={e => setHandler(e, "description_short")}/>
            </label>
            <label>
                <span>Время эпизода *</span>
                <input type="text" value={anime.episode_time} onChange={e => setHandler(e, "episode_time")}/>
            </label>
            <label className={"flex gap-2"}>
                <span>Цензура</span>
                <input type="checkbox" className={"w-auto"} checked={anime.censure}
                       onChange={e => setHandler(e, "censure")}/>
            </label>
            <label>
                <span>Изображение *</span>
                <input type="text" value={anime.image} onChange={e => setHandler(e, "image")}/>
            </label>
            <label className={'flex flex-col'}>
                <span>Графика</span>
                <select className={'bg-neutral-600 p-2 rounded-lg'} value={anime.style}
                        onChange={e => setHandler(e, "style")}>
                    <option value="Рисовка">Рисовка</option>
                    <option value="3D">3D</option>
                    <option value="Специфичная">Специфичная</option>
                </select>
            </label>
            <label className={'flex flex-col'}>
                <span>Рейтинг</span>
                <select className={'bg-neutral-600 p-2 rounded-lg'} value={anime.rating}
                        onChange={e => setHandler(e, "rating")}>
                    <option value="0+">0+</option>
                    <option value="6+">6+</option>
                    <option value="13+">13+</option>
                    <option value="16+">16+</option>
                    <option value="18+">18+</option>
                    <option value="Rx">Rx</option>
                </select>
            </label>
            <label className={'flex flex-col'}>
                <span>Тип</span>
                <select className={'bg-neutral-600 p-2 rounded-lg'} value={anime.kind}
                        onChange={e => setHandler(e, "rating")}>
                    <option value="tv">ТВ</option>
                    <option value="OVA">OVA</option>
                    <option value="ONA">ONA</option>
                    <option value="music">Клип</option>
                    <option value="movie">Фильм</option>
                    <option value="special">Спешл</option>
                </select>
            </label>
            <label>
                <span>Дата анонса * (2016-03-07 формат)</span>
                <input type="text" value={anime.announce_date} onChange={e => setHandler(e, "announce_date")}/>
            </label>
            <label>
                <span>Дата релиза * (2016-03-07)</span>
                <input type="text" value={anime.release_date} onChange={e => setHandler(e, "release_date")}/>
            </label>
            <label>
                <span>Эпизодов вышло *</span>
                <input type="number" value={anime.episodes_released}
                       onChange={e => setHandler(e, "episodes_released")}/>
            </label>
            <label>
                <span>Эпизодов всего *</span>
                <input type="number" value={anime.episodes_total} onChange={e => setHandler(e, "episodes_total")}/>
            </label>
            <label>
                <span>Первоисточник</span>
                <input type="text" value={anime.origins} onChange={e => setHandler(e, "origins")}/>
            </label>
            <label>
                <span>Автор</span>
                <input type="text" value={anime.author} onChange={e => setHandler(e, "author")}/>
            </label>
            <label>
                <span>Отзыв</span>
                <input type="text" value={anime.review} onChange={e => setHandler(e, "review")}/>
            </label>
        </div>
    );
};

export default AnimeFields;
