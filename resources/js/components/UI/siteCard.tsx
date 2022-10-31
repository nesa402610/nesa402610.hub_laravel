import React, {FC} from 'react';
import ProjectOverview from '../projectCard/projectOverview';
import ProjectInfo from '../projectCard/projectInfo';
import {IProjectProps} from "../../types/types";
// @ts-ignore
import noImage from '../../img/noimage.png';

const SiteCard: FC<IProjectProps> = ({project}) => {
    const openPageHandler = () => {
        if (project.previewURL) window.open(project.previewURL, '_blank')
    }
    return (
        <div onClick={openPageHandler}
             className={'projectCard '
                 + (project.status.toLowerCase() === 'planned' ? ' opacity-70 cursor-default planned' : ` ${project.status.toLowerCase()}`)
             }
        >
            <ProjectOverview project={project}/>
            <div className={'h-full'}>
                {project.image ? <img className={'w-full'} src={project.image} alt=""/> :
                    <div className={'h-full bg-cover bg-center'} style={{backgroundImage: `url(${noImage})`}}/>}
            </div>
            <ProjectInfo project={project}/>
        </div>
    );
};

export default SiteCard;
