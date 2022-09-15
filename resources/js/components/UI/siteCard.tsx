import React, {FC} from 'react';
import SiteOverview from '../siteCard/siteOverview';
import SiteInfo from '../siteCard/siteInfo';
import {ISiteProps} from "../../types/types";
// @ts-ignore
import noImage from '../../img/noimage.png';

const SiteCard: FC<ISiteProps> = ({site}) => {
    return (
        <a href={site.url}
           target={site.url ? "_blank" : ''}
           className={'siteCard relative flex flex-col rounded-xl overflow-hidden border-2 border-stone-500'
               + (site.state.toLowerCase() === 'planned' ? ' opacity-70 cursor-default planned' : ` ${site.state.toLowerCase()}`)
           }
           rel="noreferrer">
            <SiteOverview site={site}/>
            <div className={'h-full'}>
                {site.img ? <img className={'w-full'} src={site.img} alt=""/> :
                    <div className={'h-full bg-cover bg-center'} style={{backgroundImage: `url(${noImage})`}}/>}
            </div>
            <SiteInfo site={site}/>
        </a>
    );
};

export default SiteCard;
