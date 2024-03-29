import React, {FC} from 'react';
import SiteCard from './UI/siteCard';
import {useGetProjectsQuery} from "../services/projectService";
import Loader from "./Loader";


const ProjectSection: FC = () => {
    const {data: projects, isLoading} = useGetProjectsQuery()
    if (isLoading) return <Loader/>
    return (
        <section>
            <h2 className={'text-3xl font-bold text-center mb-8'}>Проекты</h2>
            <div className={'grid lg:grid-cols-4 sm:grid-cols-2 2xl:grid-cols-5 md:grid-cols-3 gap-4 px-4'}>
                {projects.map(project =>
                    <SiteCard key={project.name} project={project}/>
                )}
            </div>
        </section>
    );
};

export default ProjectSection;
