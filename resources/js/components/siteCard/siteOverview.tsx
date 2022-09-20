import React, {FC} from 'react';
import SiteOverviewState from './siteOverview__state';
import {ISiteProps} from "../../types/types";
import SiteOverviewHost from './siteOverview__host';
import SiteOverviewLevel from './siteOverview__level';

const SiteOverview: FC<ISiteProps> = ({project}) => {
    return (
        <div className={'siteOverview'}>
            <SiteOverviewState project={project}/>
            <SiteOverviewLevel project={project}/>
            <SiteOverviewHost project={project}/>
        </div>
    );
};

export default SiteOverview;
