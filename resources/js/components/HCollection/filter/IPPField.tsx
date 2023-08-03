import React, {Dispatch, FC, SetStateAction} from 'react';

interface IppFieldProps {
    IPP: number
    setIPP: Dispatch<SetStateAction<number>>
}

const IppField: FC<IppFieldProps> = ({IPP, setIPP}) => {
    const IPPHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = +e.target.max
        const min = +e.target.min
        const RegExp = /\d+/g
        const value = e.target.value
        let IPP = +value.match(RegExp);
        if (IPP) {
            if (IPP < min) IPP = min
            if (IPP > max) IPP = max
            setIPP(IPP)
        }
    };
    return (
        <label className={'flex flex-col'}>
            <span>Загрузить за раз</span>
            <input type="text" className={'w-auto'}
                   value={IPP} max={83} min={1}
                   onChange={e => IPPHandler(e)}/>
        </label>
    );
};

export default IppField;
