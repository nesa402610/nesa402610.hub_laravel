import React, {FC, useState} from 'react';
import {IKinopoiskItem} from "services/Kinopoisk";
import KinopoiskPreview from "components/Kinopoisk/KinopoiskPreview";

interface KinopoiskItemCardProps {
    item: IKinopoiskItem
}

const KinopoiskItemCard: FC<KinopoiskItemCardProps> = ({item}) => {
    const [preview, setPreview] = useState(false);
    const clickToWatchHandle = () => {
        event.stopPropagation()
        window.open(`https://www.sspoisk.ru/film/${item.id}/`)
    }
    return (
        <>
            <div className={`flex flex-col bg-neutral-700 rounded-lg overflow-hidden`}
                 onClick={() => setPreview(prev => !prev)}>
                <div className={'flex flex-col h-full'}>
                    <div className={'h-full flex items-start'}>
                        <img className={`object-contain`} loading={"lazy"}
                             src={item.poster?.previewUrl || item.poster?.url} alt=""/>
                    </div>
                    <div className={'p-2'} onClick={clickToWatchHandle}>
                        <span>{item.name ?? item.enName}</span>
                        <div className={'text-sm flex gap-2'}>
                            <span>KP: {item.rating.kp}</span>
                            <span>IMDB: {item.rating.imdb}</span>
                            <span>Год: {item.year}</span>
                        </div>
                    </div>
                </div>
            </div>
            {preview && <KinopoiskPreview item={item} setPreview={setPreview}/>}

        </>
    );
};

export default KinopoiskItemCard;
