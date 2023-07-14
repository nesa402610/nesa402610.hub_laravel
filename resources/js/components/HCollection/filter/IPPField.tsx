import React, {Dispatch, FC, SetStateAction} from 'react';

interface IppFieldProps {
    IPP: number
    setIPP: Dispatch<SetStateAction<number>>
}

const IppField: FC<IppFieldProps> = ({IPP, setIPP}) => {
    const IPPHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const RegExp = /\d+/g
        const value = e.target.value
        let IPP = +value.match(RegExp);
        if (IPP) {
            setIPP(IPP)
        }
    };
    return (
        <label className={'flex flex-col'}>
            <span>Загрузить за раз</span>
            <input type="text" className={'w-auto'}
                   value={IPP}
                   onChange={e => IPPHandler(e)}/>
        </label>
    );
};

export default IppField;
