import React, {FC} from "react";
import ListItem from "./ListItem";

interface ListProps {
    data: any[];

    updateFn(name, id): any;
}

const List: FC<ListProps> = ({data, updateFn}) => {
    if (!data) return null;
    return (
        <>
            {
                data?.map(({name, id, type}) =>
                    <ListItem name={name} id={id} key={id} updateFn={updateFn} tag={type}/>
                )
            }
        </>
    );
};

export default List;
