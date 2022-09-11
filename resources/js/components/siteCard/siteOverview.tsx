import React, {FC} from 'react';
import SiteOverviewState from './siteOverview__state';
import {ISiteProps} from "../../types/types";
import SiteOverviewHost from './siteOverview__host';
import SiteOverviewLevel from './siteOverview__level';

const SiteOverview: FC<ISiteProps> = ({site}) => {
    return (
        <div className={'siteOverview'}>
            <SiteOverviewState site={site}/>
            <SiteOverviewLevel site={site}/>
            <SiteOverviewHost site={site}/>
        </div>
    );
};

export default SiteOverview;