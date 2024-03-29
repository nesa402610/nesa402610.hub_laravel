import React, {FC} from "react";
import ListItem from "./ListItem";

interface ListProps {
    data: any[];

    updateFn(name, id): any;
}

const List: FC<ListProps> = ({data, updateFn}) => {
    if (!data) return null;
    return (
        <div className={'flex flex-col gap-4 flex-1'}>
            {
                data?.map(({name, id, type}) =>
                    <ListItem name={name} id={id} key={id} updateFn={updateFn} tag={type}/>
                )
            }
        </div>
    );
};

export default List;
