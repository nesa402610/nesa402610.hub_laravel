import React, {FC} from 'react';
import {ISiteProps} from "../../types/types";

const SiteOverviewHost: FC<ISiteProps> = ({site}) => {
    return (
        <div className={'site__overview--host'}>
            {site.host}
        </div>
    );
};

export default SiteOverviewHost;