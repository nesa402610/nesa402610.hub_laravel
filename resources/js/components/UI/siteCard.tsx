import React, {FC} from 'react';
import ProjectOverview from '../projectCard/projectOverview';
import ProjectInfo from '../projectCard/projectInfo';
import {IProjectProps} from "../../types/types";
// @ts-ignore
import noImage from '../../img/noimage.png';

const SiteCard: FC<IProjectProps> = ({project}) => {
    return (
        <div onClick={() => window.open(project.previewURL, '_blank')}
           className={'projectCard xs:min-h-[75vw] sm:min-h-[0px] relative flex flex-col rounded-xl overflow-hidden border-2 border-stone-500 cursor-pointer'
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
