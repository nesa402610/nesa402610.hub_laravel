import React, {FC} from 'react';
import {sites} from '../siteUrls';
import SiteCard from './UI/siteCard';


const ProjectSection: FC = () => {
    return (
        <section>
            <h2 className={'text-3xl font-bold text-center mb-8'}>Проекты</h2>
            <div className={'grid lg:grid-cols-4 sm:grid-cols-2 2xl:grid-cols-5 md:grid-cols-3 gap-4 px-4'}>
                {sites.map(site =>
                    <SiteCard key={site.name} site={site}/>
                )}
            </div>
        </section>
    );
};

export default ProjectSection;
