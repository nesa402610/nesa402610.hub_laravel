import React, {useState} from 'react';
import {useAppSelector} from "hooks/redux";

const YearsRange = ({setYears}) => {
    const {filter} = useAppSelector(state => state.collection)

    const currentYear = new Date().getFullYear()
    const [minYear, maxYear] = [1910, currentYear + 5]
    const [start, setStart] = useState(filter.years.start);
    const [end, setEnd] = useState(currentYear);
    const yearsHandler = (e: React.ChangeEvent<HTMLInputElement>, startPos: boolean) => {
        if (startPos) {
            setStart(+e.target.value)
        } else {
            setEnd(+e.target.value)
        }
        setYears({start, end})

    }
    return (
        <div className={'w-full'}>
            <span>По годам</span>
            <div className={'flex gap-4 w-full'}>
                <div className={'relative w-full'}>
                    <input type="number" min={minYear} max={end}
                           value={start} className={'m-0'}
                           onChange={e => yearsHandler(e, true)}/>
                    <input type="range" min={minYear} max={end} value={start} onChange={e => yearsHandler(e, true)}
                           className={'absolute left-0 -bottom-3'}/>
                </div>
                <div className={'relative w-full'}>
                    <input type="number" min={start} max={maxYear}
                           value={end} className={'m-0'}
                           onChange={e => yearsHandler(e, false)}/>
                    <input type="range" min={start} max={maxYear} value={end} onChange={e => yearsHandler(e, false)}
                           className={'absolute left-0 -bottom-3'}/>
                </div>
            </div>
        </div>
    );
};

export default YearsRange;
