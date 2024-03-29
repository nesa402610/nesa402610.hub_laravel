import React, {FC, useEffect, useState} from 'react';
import ProjectForm from "./ProjectForm";
import {useCreateProjectMutation, useGetProjectsQuery, useUpdateProjectMutation} from "../../services/projectService";
import {IProject} from "../../types/Project";

interface ProjectModalProps {
    closeModalHandler: () => void
    type: 'create' | 'edit'
    id?: number
}

const ProjectModal: FC<ProjectModalProps> = ({closeModalHandler, type, id}) => {
    const {data: projects} = useGetProjectsQuery()
    const [createProject, {}] = useCreateProjectMutation()
    const [updateProject, {}] = useUpdateProjectMutation()
    const [project, setProject] = useState<IProject>({
        name: '',
        source: '',
        sourceURL: '',
        previewURL: '',
        status: 'Planned',
        level: 1,
        host: 'Netlify',
        image: '',
        github: 'https://github.com/'
    })

    useEffect(() => {

        if (type === 'edit') {
            const selectedProject = projects.filter((project) => project.id === id)[0]
            setProject(selectedProject)
        }
    }, [id]);

    const createProjectHandler = (e) => {
        e.preventDefault()
        createProject(project)
        closeModalHandler()
    }
    const editProjectHandler = (e) => {
        e.preventDefault()
        updateProject({project, id})
        closeModalHandler()
    }
    return (
        <div className={'block--light'}>
            <ProjectForm setProject={setProject}
                         project={project}
                         projectHandler={type === 'edit' ? editProjectHandler : createProjectHandler}/>
        </div>
    );
};

export default ProjectModal;
