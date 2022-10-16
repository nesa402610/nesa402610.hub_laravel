import React, {FC} from 'react';
import {IProjectProps} from "../../types/types";
import {SiNetlify} from "react-icons/si";

const SiteOverviewHost: FC<IProjectProps> = ({project}) => {
    return (
        <div className={'site__overview--host'}>
            {project.host === 'Netlify' && <SiNetlify color={'22e1c6'}/>}
        </div>
    );
};

export default SiteOverviewHost;
