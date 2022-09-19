import React from 'react';
// @ts-ignore
import noImage from "../../img/noimage.png";
import SiteInfo from "../siteCard/siteInfo";
import {Link} from "react-router-dom";

const ProjectCard = ({site}) => {
    return (
        <Link to={`/admin/editProject/${site.id}`}
              className={'siteCard relative flex flex-col rounded-xl overflow-hidden border-2 border-stone-500'
                  + (site.status.toLowerCase() === 'planned' ? ' opacity-70 cursor-default planned' : ` ${site.status.toLowerCase()}`)}>
            <div className={'h-full'}>
                {site.image ? <img className={'w-full'} src={site.image} alt=""/> :
                    <div className={'h-full bg-cover bg-center'} style={{backgroundImage: `url(${noImage})`}}/>}
            </div>
            <SiteInfo site={site}/>
        </Link>
    );
};

export default ProjectCard;
