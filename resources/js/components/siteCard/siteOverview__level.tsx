import React, {FC, useEffect, useState} from 'react';
import {ISiteProps} from "../../types/types";
import {GiLevelFourAdvanced, GiLevelThree, GiLevelThreeAdvanced, GiLevelTwo, GiLevelTwoAdvanced} from "react-icons/gi";

const SiteOverviewLevel: FC<ISiteProps> = ({project}) => {
    const [level, setLevel] = useState({name: '', ico: null})
    useEffect(() => {
        if (project.level === 1) {
            return setLevel({name: 'newbie', ico: <GiLevelTwo color={'45ade1'}/>})
        } else if (project.level === 2) {
            return setLevel({name: 'junior', ico: <GiLevelTwoAdvanced color={'74e116'}/>})
        } else if (project.level === 3) {
            return setLevel({name: 'intermediate', ico: <GiLevelThree color={'F8961E'}/>})
        } else if (project.level === 4) {
            return setLevel({name: 'advanced', ico: <GiLevelThreeAdvanced color={'F3722C'}/>})
        } else if (project.level === 5) {
            return setLevel({name: 'guru', ico: <GiLevelFourAdvanced color={'F94144'}/>})
        }
    }, [])

    return (
        <div className={'flex items-center'}>
            <div className={'ico'}>
                {level.ico}
            </div>
            <div className={'text-base'}>
                {level.name} &nbsp;
            </div>
        </div>
    );
};

export default SiteOverviewLevel;
