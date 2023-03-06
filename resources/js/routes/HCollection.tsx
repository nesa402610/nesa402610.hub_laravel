import React, {FC, useEffect, useState} from 'react';
import {useLazyGetCollectionQuery} from "../services/HCollectionService";
import {ICollection} from "../types/types";
import Loader from "../components/Loader";

const HCollection: FC = () => {
  const [trigger, {data: collection, isLoading, error}] = useLazyGetCollectionQuery()
  // const [error, setError] = useState('');
  const [passkey, setPasskey] = useState('');
  // const {data: collection} = useGetCollectionQuery(passkey)
  // console.log(localStorage.getItem('passkey'))
  useEffect(() => {
    if (localStorage.getItem('passkey')) {
      setPasskey(localStorage.getItem('passkey'))
    }
  }, []);

  useEffect(() => {
    if (collection) {
      localStorage.setItem('passkey', passkey)
    }
  }, [collection]);

  useEffect(() => {
    if (passkey.length === 18) {
      trigger(passkey)
    }
  }, [passkey]);
  if (!collection) {
    return (
      <div className={'block--dark flex flex-col m-4'}>
        <h2 className={'text-center font-bold text-lg mb-2'}>Для прохода дальше, требуется ввести ключ доступа</h2>
        <input type="text"
               value={passkey}
               onChange={e => setPasskey(e.target.value)}
               placeholder={'Ключ доступа...'}
               maxLength={18}/>
        <span className={'mt-2 text-red-500'}>{error && error.data.msg}</span>
      </div>
    )
  }
  if (isLoading) {
    return <Loader/>
  }
  return (
    <div className={'m-4'}>
      <div className={'block--dark flex flex-col gap-4 mt-4'}>
        <h1 className={'text-center font-bold text-2xl'}>Добро пожаловать в зону души!</h1>
        {collection?.map((title: ICollection) =>
          <div key={title.id} className={'bg-neutral-700 p-4 rounded-lg'}>
            <div className={'flex gap-4'}>
              <img className={'rounded-lg'} src={title.image} width={250} alt="Изображение тайтла"/>
              <div className={'flex flex-col'}>
                <span>{title.title_ru} / {title.title_original}</span>
                <div className={'text-neutral-300'}>
                  <h3 className={'mt-4 font-bold'}>Информация</h3>
                  <div className={'flex flex-col'}>
                    <span>Год выпуска: {title.announce_date}</span>
                    <span>Жарны: {title.tags.map(tag => tag.name)}</span>
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
      </div>
    </div>
  );
};

export default HCollection;
