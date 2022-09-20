import React, {FC} from 'react';
import SiteOverview from '../siteCard/siteOverview';
import SiteInfo from '../siteCard/siteInfo';
import {ISiteProps} from "../../types/types";
// @ts-ignore
import noImage from '../../img/noimage.png';

const SiteCard: FC<ISiteProps> = ({project}) => {
    return (
        <a href={project.previewURL}
           target={project.previewURL ? "_blank" : ''}
           className={'siteCard xs:min-h-[75vw] sm:min-h-[0px] relative flex flex-col rounded-xl overflow-hidden border-2 border-stone-500'
               + (project.status.toLowerCase() === 'planned' ? ' opacity-70 cursor-default planned' : ` ${project.status.toLowerCase()}`)
           }
           rel="noreferrer">
            <SiteOverview project={project}/>
            <div className={'h-full'}>
                {project.image ? <img className={'w-full'} src={project.image} alt=""/> :
                    <div className={'h-full bg-cover bg-center'} style={{backgroundImage: `url(${noImage})`}}/>}
            </div>
            <SiteInfo project={project}/>
        </a>
    );
};

export default SiteCard;
