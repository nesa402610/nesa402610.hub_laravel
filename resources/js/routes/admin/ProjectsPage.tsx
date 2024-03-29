import React from 'react';
import ProjectCard from "../../components/admin/ProjectCard";
import {useGetProjectsQuery} from "../../services/projectService";

const ProjectsPage = () => {
    const {data: projects} = useGetProjectsQuery()
    return (
        <div className={'grid lg:grid-cols-4 md:grid-cols-2 2xl:grid-cols-5 sm:grid-cols-1 gap-4 px-4'}>
            {projects?.map(project =>
                <ProjectCard key={project.name} project={project}/>
            )}
        </div>
    );
};

export default ProjectsPage;
