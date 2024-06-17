import React, {FC} from "react";
import ListItem from "./ListItem";

interface ListProps {
    data: any[];
    title?: string
    type?: 'tag' | 'genre'

    updateFn(name, id): void;

    deleteFn(id, type): void
}

const List: FC<ListProps> = ({data, updateFn, deleteFn, title, type}) => {
    if (!data) return null;
    return (
        <div className={'flex flex-col gap-4 flex-1'}>
            {title && <h2>{title}</h2>}
            {
                data?.map(({name, id, rx}) =>
                    <ListItem deleteFn={deleteFn} type={type} name={name} id={id} key={name} updateFn={updateFn}
                              isRx={rx}/>
                )
            }
        </div>
    );
};

export default List;
