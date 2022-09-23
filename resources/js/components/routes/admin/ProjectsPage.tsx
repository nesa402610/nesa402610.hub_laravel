import React from 'react';
import ProjectCard from "../../UI/ProjectCard";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const ProjectsPage = () => {
    const projects = useTypedSelector(state => state.homePage.projects)
    return (
        <div className={'p-4'}>
            <div className={'grid lg:grid-cols-4 md:grid-cols-2 2xl:grid-cols-5 sm:grid-cols-1 gap-4 px-4'}>
                {projects.map(site =>
                    <ProjectCard key={site.name} site={site}/>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
