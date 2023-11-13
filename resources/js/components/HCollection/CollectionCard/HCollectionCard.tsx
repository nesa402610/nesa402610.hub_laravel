import React, {FC} from "react";
import Title from "./Title";
import CollectionStatus from "./CollectionStatus";
import {ICollection} from "types/types";
import Image from "./Image";
import CollectionDescription from "./CollectionDescription";
import CollectionInfo from "./CollectionInfo/CollectionInfo";
import {useGetUserQuery} from "services/userService";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";
import HCollectionTags from "components/HCollection/CollectionCard/HCollectionTags";

interface CollectionProps {
    collection: ICollection;
    link?: boolean;
    admin?: boolean
}

const HCollectionCard: FC<CollectionProps> = ({collection, link = false, admin = false}) => {
    const {data: user} = useGetUserQuery()
    const isAdmin = user?.role[0].name === 'Admin'
    const type = collection?.type === 0 ? 'ZERO' : 'ONE'

    if (!collection) return null;

    const path = admin ? `${collection.id}` : `/NULL/unit/${type}/${collection.id}`
    return (
        <div className={"relative bg-neutral-700 p-4 rounded-lg"}>
            {isAdmin &&
                <div className={'absolute right-4 hover:scale-110 transition-all'}>
                    <Link to={`/admin/anime/${collection.id}`}
                          className={'flex flex-col items-center text-neutral-300'}>
                        <FiEdit size={'1.5rem'}/>
                    </Link>
                </div>
            }
            <div className={"flex flex-col gap-4"}>
                <div className={'flex xs:flex-col md:flex-row gap-4'}>
                    <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
                        <Image link={link} path={path} image={collection.image}/>
                        {/*<CollectionRating/>*/}
                        <CollectionStatus type={collection.type} status={collection.status} animeID={collection.id}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <Title path={path} link
                               RU={collection.title_ru}
                               EN={collection.title_en}
                               ORIGINAL={collection.title_original}/>
                        <CollectionInfo collection={collection}/>
                        <CollectionDescription description={collection.description}/>
                    </div>
                </div>
                <HCollectionTags collectionID={collection.id} collectionTags={collection.tags}/>
            </div>
        </div>
    );
};

export default HCollectionCard;
