import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProjectCard from "../../UI/ProjectCard";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        axios.get('projects').then(r => setProjects(r.data)).catch(err => console.log(err))
    }, [])
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
