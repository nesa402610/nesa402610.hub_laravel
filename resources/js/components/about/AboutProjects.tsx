import React from 'react';
import {useGetProjectsQuery} from "services/projectService";
import ProjectCard from "components/admin/ProjectCard";
import Loader from "components/Loader";

const AboutProjects = () => {
    const {data: projects, isLoading} = useGetProjectsQuery();
    if (isLoading) return <Loader/>
    return (
        <div className={'grid grid-cols-4 gap-4'}>
            {projects.map((project) =>
                <ProjectCard project={project}/>
            )}
        </div>
    );
};

export default AboutProjects;
