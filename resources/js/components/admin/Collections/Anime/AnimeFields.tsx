import React, {Dispatch, FC, SetStateAction} from "react";
import {ICollection} from "types/types";
import AnimeField from "components/admin/Collections/Anime/AnimeField";

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
        <div className={"flex flex-col gap-2"}>
            <AnimeField value={anime.title_ru} name={'title_ru'} title={'Название на русском'} onChange={setHandler}/>
            <AnimeField value={anime.title_en} name={'title_en'} title={'Название на английском'} onChange={setHandler}
                        required/>
            <AnimeField value={anime.title_original} name={'title_original'} title={'Оригинальное название'}
                        onChange={setHandler} required/>
            <AnimeField value={anime.description} name={'description'} title={'Описание'} onChange={setHandler} required
                        type={'textarea'}/>
            <AnimeField value={anime.description_short} name={'description_short'} title={'Краткое описание'}
                        onChange={setHandler} type={'textarea'}/>
            <label className={"flex gap-2"}>
                <span>Цензура</span>
                <input type="checkbox" className={"w-auto"} checked={anime.censure}
                       onChange={e => setHandler(e, "censure")}/>
            </label>
            <AnimeField value={anime.image} name={'image'} title={'Изображение'} onChange={setHandler} required/>
            <div className={'flex gap-4'}>
                <AnimeField value={anime.announce_date} name={'announce_date'} title={'Дата анонса'}
                            onChange={setHandler} required type={'date'}/>
                <AnimeField value={anime.release_date} name={'release_date'} title={'Дата релиза'} onChange={setHandler}
                            required type={'date'}/>
            </div>
            <div className={'flex gap-4'}>
                <AnimeField value={anime.episode_time} name={'episode_time'} title={'Время эпизода'}
                            onChange={setHandler} required type={'number'}/>
                <AnimeField value={anime.episodes_released} name={'episodes_released'} title={'Эпизодов вышло'}
                            onChange={setHandler} required type={'number'}/>
                <AnimeField value={anime.episodes_total} name={'episodes_total'} title={'Эпизодов всего'}
                            onChange={setHandler} required type={'number'}/>
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
                            onChange={e => setHandler(e, "kind")}>
                        <option value="tv">ТВ</option>
                        <option value="OVA">OVA</option>
                        <option value="ONA">ONA</option>
                        <option value="music">Клип</option>
                        <option value="movie">Фильм</option>
                        <option value="special">Спешл</option>
                    </select>
                </label>
            </div>
            <div className={'flex gap-4'}>
                <AnimeField value={anime.origins} name={'origins'} title={'Первоисточник'} onChange={setHandler}/>
                <AnimeField value={anime.author} name={'author'} title={'Автор'} onChange={setHandler}/>
            </div>
            <AnimeField value={anime.review} name={'review'} title={'Отзыв'} onChange={setHandler}
                        type={'textarea'}
            />
        </div>
    );
};

export default AnimeFields;
