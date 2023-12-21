import React, {Dispatch, FC, SetStateAction} from 'react';
import InfoField from "components/HCollection/CollectionCard/CollectionInfo/InfoField";
import CollectionDescription from "components/HCollection/CollectionCard/CollectionDescription";
import {IKinopoiskItem} from "services/Kinopoisk";

interface KinopoiskPreviewProps {
    item: IKinopoiskItem
    setPreview: Dispatch<SetStateAction<boolean>>
}

const KinopoiskPreview: FC<KinopoiskPreviewProps> = ({item, setPreview}) => {

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
                        <InfoField title={'Жанры:'}>
                            <div className={'flex gap-2'}>
                                {item?.genres?.map(genre =>
                                    <span>{genre.name}</span>
                                )}
                            </div>
                        </InfoField>
                        <InfoField title={'Страна: '} value={item.countries[0].name}/>
                        <InfoField title={'Рейтинг КП: '}>
                            {item.rating.kp} ({item.votes.kp})
                        </InfoField>
                        <InfoField title={'Рейтинг IMDB: '}>
                            {item.rating.imdb} ({item.votes.imdb})
                        </InfoField>
                        <CollectionDescription description={item.description}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KinopoiskPreview;
