import React, {FC} from 'react';
import {useGetMangaByIdQuery} from "../../services/Collections/MangaService";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const MangaHeader: FC = () => {
    const {id} = useParams();
    const passkey = localStorage.getItem('passkey')
    const {data} = useGetMangaByIdQuery({passkey, id, type: "manga"});
    if (!data) return null
    return (
        <header className={'bg-neutral-700 fixed w-full'}>
            <div>
                <Link to={`/NULL/m/${data.id}`}>{data.title_ru}</Link>
            </div>
        </header>
    );
};

export default MangaHeader;
