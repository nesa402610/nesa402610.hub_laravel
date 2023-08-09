import React from 'react';

const CollectionDescription = ({description}) => {
    return (
        <div>
            <h3 className={"mt-4 font-bold"}>Описание</h3>
            <p>{description ? description : 'Описание отсутствует...'}</p>
        </div>
    );
};

export default CollectionDescription;
