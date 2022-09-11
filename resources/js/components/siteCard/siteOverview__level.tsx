import React, {FC} from 'react';
import {ISiteProps} from "../../types/types";

const SiteOverviewLevel: FC<ISiteProps> = ({site}) => {
    return (
        <div className={'flex items-center'}>
            <div className={'ico'}>
                {site.level.ico}
            </div>
            <div className={'text-base'}>
                {site.level.name} &nbsp;
            </div>
        </div>
    );
};

export default SiteOverviewLevel;