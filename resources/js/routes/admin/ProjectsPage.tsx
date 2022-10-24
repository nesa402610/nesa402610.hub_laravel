import React from 'react';
import ProjectCard from "../../components/admin/ProjectCard";
import {useAppSelector} from "../../hooks/redux";

const ProjectsPage = () => {
    const projects = useAppSelector(state => state.homePage.projects)
    return (
        <div className={'grid lg:grid-cols-4 md:grid-cols-2 2xl:grid-cols-5 sm:grid-cols-1 gap-4 px-4'}>
            {projects.map(project =>
                <ProjectCard key={project.name} project={project}/>
            )}
        </div>
    );
};

export default ProjectsPage;
