import React, {FC} from 'react';
import {FaTrashCan} from "react-icons/fa6";

interface DeleteProps {
    deleteFn(any: any): void
}

const Delete: FC<DeleteProps> = ({deleteFn}) => {
    return (
        <li onClick={deleteFn} className={'flex justify-between items-center text-red-500'}>Удалить <FaTrashCan/></li>
    );
};

export default Delete;
