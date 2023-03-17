import React, {FC, useEffect, useState} from 'react';
import {useLazyGetCollectionQuery} from "../services/HCollectionService";
import Collection from "../components/collection/Collection";
import Loader from "../components/Loader";
import {ICollection} from "../types/types";

const HCollectionPage: FC = () => {
  const [trigger, {data: collection, isLoading, error}] = useLazyGetCollectionQuery()
  const [passkey, setPasskey] = useState('');
  const [filteredCollection, setFilteredCollection] = useState<ICollection[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!collection) return;
    const filtered = collection.filter(c => c.title_ru.toLowerCase().includes(filter.toLowerCase()))
    setFilteredCollection(filtered)
  }, [filter, collection]);

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

  if (!localStorage.getItem('passkey') && !collection) {
    return (
      <div className={'block--dark flex flex-col m-4'}>
        <h2 className={'text-center font-bold text-lg mb-2'}>Для прохода дальше, требуется ввести ключ доступа</h2>
        <input type="text"
               value={passkey}
               onChange={e => setPasskey(e.target.value)}
               placeholder={'Ключ доступа...'}
               maxLength={18}/>
        <span className={'mt-2 text-red-500'}>{error && 'Кажется.... Ключ не подошел?'}</span>
      </div>
    )
  }
  if (isLoading) return <Loader/>

  return (
    <div className={'m-4'}>
      <div className={'block--dark flex flex-col gap-4 mt-4'}>
        <h1 className={'text-center font-bold text-2xl'}>Добро пожаловать в зону души!</h1>
        <h3 className={'text-sm text-neutral-500 italic text-end mr-2'}>
          Я не при делах если что. Все данные взяты с открытых источников.
        </h3>
        <div>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)}/>
        </div>
        {filteredCollection.map(collectionItem => <Collection key={collectionItem.id}
                                                                                    collection={collectionItem}/>)}
      </div>
    </div>
  );
};

export default HCollectionPage;
