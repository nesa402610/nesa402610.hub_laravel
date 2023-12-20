import React from 'react';
import InfoField from "components/HCollection/CollectionCard/CollectionInfo/InfoField";
import CollectionDescription from "components/HCollection/CollectionCard/CollectionDescription";

const KinopoiskPreview = ({item, setPreview}) => {

    return (
        <div className={'relative col-span-full col-start-1 bg-neutral-700 p-4 rounded-lg'}>
            <span className={'absolute right-4 top-4'} onClick={() => setPreview(false)}>X</span>
            <div className={'flex gap-4'}>
                <img className={'h-[400px] rounded-lg'} src={item.poster.previewUrl} alt=""/>
                <div>
                    <div>
                        <h2>{item.name}</h2>
                        <h3>{item.enName}</h3>
                    </div>
                    <div>
                        <InfoField title={'Жанры'}>
                            {item?.genres?.map(genre =>
                                genre.name
                            )}
                        </InfoField>
                        <InfoField title={'Рейтинг КП: '} value={item.rating.kp}/>
                        <InfoField title={'Рейтинг IMDB: '} value={item.rating.imdb}/>
                        <CollectionDescription description={item.description}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KinopoiskPreview;
