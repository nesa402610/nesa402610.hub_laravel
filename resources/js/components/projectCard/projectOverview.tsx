import React, {FC} from 'react';
import SiteOverviewState from './projectOverview__state';
import {IProjectProps} from "../../types/types";
import SiteOverviewHost from './projectOverview__host';
import SiteOverviewLevel from './projectOverview__level';
import ProjectOverviewGithub from "./projectOverview__github";


const ProjectOverview: FC<IProjectProps> = ({project}) => {
    return (
        <div className={'siteOverview'}>
            <SiteOverviewState project={project}/>
            <SiteOverviewLevel project={project}/>
            <SiteOverviewHost project={project}/>
            <ProjectOverviewGithub project={project}/>
        </div>
    );
};

export default ProjectOverview;
