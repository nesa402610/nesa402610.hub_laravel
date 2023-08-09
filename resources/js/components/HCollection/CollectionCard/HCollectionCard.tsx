import React, {FC} from "react";
import Title from "./Title";
import CollectionStatus from "./CollectionStatus";
import {ICollection} from "../../../types/types";
import Image from "./Image";
import CollectionDescription from "./CollectionDescription";
import CollectionInfo from "./CollectionInfo/CollectionInfo";

interface CollectionProps {
    collection: ICollection;
    link?: boolean;
    admin?: boolean

}

const HCollectionCard: FC<CollectionProps> = ({collection, link = false, admin = false}) => {
    const type = collection?.type === 0 ? 'ZERO' : 'ONE'

    if (!collection) return null;

    const path = admin ? `${collection.id}` : `/NULL/unit/${type}/${collection.id}`
    return (
        <div className={"bg-neutral-700 p-4 rounded-lg"}>
            <div className={"flex xs:flex-col md:flex-row gap-4"}>
                <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
                    <Image link={link} path={path} image={collection.image}/>
                    <CollectionStatus type={collection.type} status={collection.status} animeID={collection.id}/>
                </div>
                <div className={"flex flex-col"}>
                    <div className={'flex flex-col'}>
                        <Title path={path} collection={collection} link/>
                        <span className={'text-sm italic text-neutral-400'}>{collection.title_en}</span>
                    </div>
                    <CollectionInfo collection={collection}/>
                    <CollectionDescription description={collection.description}/>
                </div>
            </div>
        </div>
    );
};

export default HCollectionCard;
