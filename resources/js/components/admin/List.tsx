import React, {FC} from "react";
import ListItem from "./ListItem";

interface ListProps {
    data: any[];
    title?: string

    updateFn(name, id): any;
}

const List: FC<ListProps> = ({data, updateFn, title}) => {
    if (!data) return null;
    return (
        <div className={'flex flex-col gap-4 flex-1'}>
            {title && <h2>{title}</h2>}
            {
                data?.map(({name, id, type}) =>
                    <ListItem name={name} id={id} key={id} updateFn={updateFn} tag={type}/>
                )
            }
        </div>
    );
};

export default List;
