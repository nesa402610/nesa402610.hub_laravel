import React, {FC} from 'react';
import SiteOverviewState from './siteOverview__state';
import {IProjectProps} from "../../types/types";
import SiteOverviewHost from './siteOverview__host';
import SiteOverviewLevel from './siteOverview__level';
import ProjectOverviewGithub from "./projectOverview__github";


const SiteOverview: FC<IProjectProps> = ({project}) => {
    return (
        <div className={'siteOverview'}>
            <SiteOverviewState project={project}/>
            <SiteOverviewLevel project={project}/>
            <SiteOverviewHost project={project}/>
            <ProjectOverviewGithub project={project}/>
        </div>
    );
};

export default SiteOverview;
