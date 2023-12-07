import React from 'react';
import {useGetProjectsQuery} from "services/projectService";
import Loader from "components/Loader";
import SiteCard from "components/UI/siteCard";

const AboutProjects = () => {
    const {data: projects, isLoading} = useGetProjectsQuery();
    if (isLoading) return <Loader/>
    return (
        <div className={'grid grid-cols-4 gap-4'}>
            {projects.map((project) =>
                <SiteCard project={project}/>
            )}
        </div>
    );
};

export default AboutProjects;
