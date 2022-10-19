import React, {FC} from 'react';
import {CgRadioCheck, CgRadioChecked} from "react-icons/cg";

interface ListItemProps {
    children: any
    completed?: boolean
    bold?: boolean
}

const ListItem: FC<ListItemProps> = ({children, completed, bold}) => {
    return (
        <li className={'flex items-center gap-2'}>
            {completed
                ?
                <CgRadioChecked
                    className={'text-green-300'}/>
                :
                <CgRadioCheck/>}
            <span className={bold && 'font-bold'}>{children}</span>
        </li>
    );
};

export default ListItem;
