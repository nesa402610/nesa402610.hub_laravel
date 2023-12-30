import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import Loader from "components/Loader";

interface KinopiskFilterProps {
    setParams: Dispatch<SetStateAction<any>>

    getByName(string: string): any
}

const KinopoiskFilter: FC<KinopiskFilterProps> = ({setParams, getByName}) => {
    const genres = [
        {
            "name": "аниме",
            "slug": "anime"
        },
        {
            "name": "биография",
            "slug": "biografiya"
        },
        {
            "name": "боевик",
            "slug": "boevik"
        },
        {
            "name": "вестерн",
            "slug": "vestern"
        },
        {
            "name": "военный",
            "slug": "voennyy"
        },
        {
            "name": "детектив",
            "slug": "detektiv"
        },
        {
            "name": "детский",
            "slug": "detskiy"
        },
        {
            "name": "для взрослых",
            "slug": "dlya-vzroslyh"
        },
        {
            "name": "документальный",
            "slug": "dokumentalnyy"
        },
        {
            "name": "драма",
            "slug": "drama"
        },
        {
            "name": "игра",
            "slug": "igra"
        },
        {
            "name": "история",
            "slug": "istoriya"
        },
        {
            "name": "комедия",
            "slug": "komediya"
        },
        {
            "name": "концерт",
            "slug": "koncert"
        },
        {
            "name": "короткометражка",
            "slug": "korotkometrazhka"
        },
        {
            "name": "криминал",
            "slug": "kriminal"
        },
        {
            "name": "мелодрама",
            "slug": "melodrama"
        },
        {
            "name": "музыка",
            "slug": "muzyka"
        },
        {
            "name": "мультфильм",
            "slug": "multfilm"
        },
        {
            "name": "мюзикл",
            "slug": "myuzikl"
        },
        {
            "name": "новости",
            "slug": "novosti"
        },
        {
            "name": "приключения",
            "slug": "priklyucheniya"
        },
        {
            "name": "реальное ТВ",
            "slug": "realnoe-TV"
        },
        {
            "name": "семейный",
            "slug": "semeynyy"
        },
        {
            "name": "спорт",
            "slug": "sport"
        },
        {
            "name": "ток-шоу",
            "slug": "tok-shou"
        },
        {
            "name": "триллер",
            "slug": "triller"
        },
        {
            "name": "ужасы",
            "slug": "uzhasy"
        },
        {
            "name": "фантастика",
            "slug": "fantastika"
        },
        {
            "name": "фильм-нуар",
            "slug": "film-nuar"
        },
        {
            "name": "фэнтези",
            "slug": "fentezi"
        },
        {
            "name": "церемония",
            "slug": "ceremoniya"
        }
    ]
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filters, setFilters] = useState({
        page: 1,
        limit: '250',
        name: '',
        isSeries: false,
        year: '2005-2023',
        sortField: 'rating.kp',
        sortType: '-1',
        ageRating: '0-18',
        type: 'movie',
        // movieLength: '30-400',
        'rating.kp': '0-10',

    });

    const setFiltersHandle = (e, field: string) => {
        setFilters(prevState => ({...prevState, [field]: e.target.value}))
    }
    const applyFiltersHandle = () => {
        if (filters.name) {
            getByName(filters.name)
        } else {
            setParams(filters)
        }
    }
    useEffect(() => {
        setFilters(prev => ({...prev, 'genres.name': [...selectedGenres, '!аниме']}))
    }, [selectedGenres]);
    if (!genres) return <Loader/>
    return (
        <div className={'flex flex-col gap-4 bg-neutral-800 p-4 rounded-lg'}>
            <h2>Фильтры</h2>
            <div className={'flex flex-col gap-2'}>
                <div className={'flex gap-4'}>
                    <label className={'flex-1'}>
                        Название
                        <input type="text" onChange={e => setFiltersHandle(e, 'name')} value={filters.name}/>
                    </label>
                </div>
                <div className={'flex gap-4'}>
                    <label>
                        Рейтинг кинопоиска (7 или 5-10)
                        <input disabled={!!filters.name} type="text" value={filters['rating.kp']}
                               onChange={e => setFiltersHandle(e, 'rating.kp')}/>
                    </label>
                    <label>
                        Возрастной рейтинг
                        <input disabled={!!filters.name} type="text" onChange={e => setFiltersHandle(e, 'ageRating')}
                               value={filters.ageRating}/>
                    </label>
                    <label>
                        Год (прим., "2020" или "2005-2020")
                        <input disabled={!!filters.name} type="text" onChange={e => setFiltersHandle(e, 'year')}
                               value={filters.year}/>
                    </label>
                    <label>
                        Длительность (100-120)
                        <input disabled={!!filters.name} type="text" onChange={e => setFiltersHandle(e, 'movieLength')}
                               value={filters['movieLength']}/>
                    </label>
                </div>
                <div className={'flex gap-4 items-center'}>
                    <label>
                        Отображать за раз
                        <input disabled={!!filters.name} type="text" onChange={e => setFiltersHandle(e, 'limit')}
                               value={filters.limit}/>
                    </label>
                    <label>
                        Сериал
                        <input disabled={!!filters.name} type="checkbox"
                               onChange={e => setFilters(prev => ({...prev, isSeries: e.target.checked}))}
                               checked={filters.isSeries}/>
                    </label>
                    <label className={'flex flex-col'}>
                        Сортировка по
                        <select disabled={!!filters.name} value={filters.sortField}
                                onChange={e => setFiltersHandle(e, 'sortField')}
                                className={'bg-neutral-600 text-white p-2 rounded-lg'}>
                            <option value="name">По названию</option>
                            <option value="year">По годам</option>
                            <option value="rating.kp">По рейтингу КП</option>
                        </select>
                    </label>
                    <label className={'flex flex-col'}>
                        Тип
                        <select disabled={!!filters.name} onChange={e => setFilters({...filters, type: e.target.value})}
                                className={'bg-neutral-600 text-white p-2 rounded-lg'}>
                            <option value="movie">Фильм</option>
                            <option value="tv-series">Сериал</option>
                            <option value="cartoon">Мультик</option>
                            <option value="animated-series">Анимационый сериал</option>
                            <option value="anime">Аниме</option>
                            <option value="!movie">Не Фильм</option>
                            <option value="!tv-series">Не Сериал</option>
                            <option value="!cartoon">Не Мультик</option>
                            <option value="!animated-series">Не Анимационый сериал</option>
                            <option value="!anime">Не Аниме</option>
                        </select>
                    </label>
                    {/*<Selector placeholder={''} values={{data: genres}} selected={filters['genres.name']}*/}
                    {/*          setSelected={setSelectedGenres}/>*/}
                    <label className={'flex flex-col'}>
                        Жанры
                        <select disabled={!!filters.name} onChange={e => setFiltersHandle(e, 'genres.name')}
                                className={'bg-neutral-600 text-white p-2 rounded-lg'}>
                            {genres?.map(genre =>
                                <option value={genre.name}>{genre.name}</option>
                            )}
                        </select>
                    </label>

                </div>
            </div>
            <div>
                <button onClick={applyFiltersHandle} className={'bg-red-700 p-2 px-4 rounded-lg'}>Поиск</button>
            </div>

        </div>
    );
};

export default KinopoiskFilter;
