import React from 'react';
import {parseBbCode} from '../../../helpers/BBParser';

const CollectionDescription = ({description}) => {
    const tags: string[] = ['character', 'b', 'i', 'u', 'url', 'img', 'quote', 'spoiler']


    return (
        <div>
            <h3 className={"mt-4 font-bold"}>Описание</h3>
            {parseBbCode(description)}
        </div>
    );
};

export default CollectionDescription;
