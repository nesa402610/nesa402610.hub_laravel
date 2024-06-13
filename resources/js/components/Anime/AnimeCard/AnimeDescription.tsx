import React from 'react';
import {parseBbCode} from '../../../helpers/BBParser';

const AnimeDescription = ({description}) => {
    return (
        <div>
            <h3 className={"mt-4 font-bold"}>Описание</h3>
            {parseBbCode(description)}
        </div>
    );
};

export default AnimeDescription;
