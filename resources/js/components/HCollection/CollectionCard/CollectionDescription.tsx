import React from 'react';

const CollectionDescription = ({description}) => {
    return (
        <div>
            <h3 className={"mt-4 font-bold"}>Описание</h3>
            <p>{description}</p>
        </div>
    );
};

export default CollectionDescription;
