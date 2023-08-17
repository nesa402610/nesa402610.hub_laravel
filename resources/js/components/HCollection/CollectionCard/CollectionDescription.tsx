import React, {useEffect, useState} from 'react';

const CollectionDescription = ({description}) => {
    const tags: string[] = ['character', 'b', 'i', 'u', 'url', 'img', 'quote', 'spoiler']
    const [newDesc, setNewDesc] = useState<string>(description);
    useEffect(() => {
        if (!newDesc) return
        for (const tag of tags) {
            const openTag = new RegExp("\\[" + tag + "(.*?)]", "gm");
            const closeTag = new RegExp("\\[/" + tag + "(.*?)]", "gm");
            setNewDesc(prev => prev.replace(openTag, '').replace(closeTag, '') ?? 'Забыли описание добавить')
        }
    }, []);

    return (
        <div>
            <h3 className={"mt-4 font-bold"}>Описание</h3>
            <p>{newDesc ?? description}</p>
        </div>
    );
};

export default CollectionDescription;
