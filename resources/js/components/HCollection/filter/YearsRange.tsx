import React, {useState} from 'react';

const YearsRange = ({setYears}) => {
    const currentYear = new Date().getFullYear()
    const maxYear = currentYear + 5
    const [start, setStart] = useState(2010);
    const [end, setEnd] = useState(currentYear);
    const yearsHandler = (e, min = false) => {
        if (min) setStart(Number(e.target.value))
        else setEnd(Number(e.target.value))
        setYears({start, end})
    }
    return (
        <div className={'w-full'}>
            <span>По годам</span>
            <div className={'flex gap-4 w-full'}>
                <div className={'relative w-full'}>
                    <input type="number" min={1910} max={end - 1}
                           value={start} className={'m-0'}
                           onChange={e => yearsHandler(e, true)}/>
                    <input type="range" min={1910} max={end - 1} value={start} onChange={e => yearsHandler(e, true)}
                           className={'absolute left-0 -bottom-3'}/>
                </div>
                <div className={'relative w-full'}>
                    <input type="number" min={start + 1} max={maxYear}
                           value={end} className={'m-0'}
                           onChange={e => yearsHandler(e)}/>
                    <input type="range" min={start + 1} max={maxYear} value={end} onChange={e => yearsHandler(e)}
                           className={'absolute left-0 -bottom-3'}/>
                </div>
            </div>
        </div>
    );
};

export default YearsRange;
