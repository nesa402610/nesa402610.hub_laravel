import React, {FC} from 'react';
import {ISiteProps} from "../../types/types";
import {SiNetlify} from "react-icons/si";

const SiteOverviewHost: FC<ISiteProps> = ({project}) => {
    return (
        <div className={'site__overview--host'}>
            {project.host === 'Netlify' && <SiNetlify color={'22e1c6'}/>}
        </div>
    );
};

export default SiteOverviewHost;
