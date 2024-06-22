import React, {useState} from 'react';
import {useAppSelector} from "hooks/redux";

const YearsRange = ({setYears, years}) => {
    const {filter} = useAppSelector(state => state.collection)

    const currentYear = new Date().getFullYear()
    const [minYear, maxYear] = [1910, currentYear + 5]
    const yearsHandler = (e: React.ChangeEvent<HTMLInputElement>, startPos: boolean) => {
        if (startPos) {
            setYears({...years, start: +e.target.value})
        } else {
            setYears({...years, end: +e.target.value})
        }

    }
    return (
        <div className={'w-full'}>
            <span>По годам</span>
            <div className={'flex gap-4 w-full'}>
                <div className={'relative w-full'}>
                    <input type="number" min={minYear} max={years.end}
                           value={years.start} className={'m-0'}
                           onChange={e => yearsHandler(e, true)}/>
                    <input type="range" min={minYear} max={years.end} value={years.start} onChange={e => yearsHandler(e, true)}
                           className={'absolute left-0 -bottom-3'}/>
                </div>
                <div className={'relative w-full'}>
                    <input type="number" min={years.start} max={maxYear}
                           value={years.end} className={'m-0'}
                           onChange={e => yearsHandler(e, false)}/>
                    <input type="range" min={years.start} max={maxYear} value={years.end} onChange={e => yearsHandler(e, false)}
                           className={'absolute left-0 -bottom-3'}/>
                </div>
            </div>
        </div>
    );
};

export default YearsRange;
