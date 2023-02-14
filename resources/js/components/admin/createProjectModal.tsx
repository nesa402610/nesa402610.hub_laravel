import React, {FC, useState} from 'react';
import ProjectForm from "./ProjectForm";
import {useCreateProjectMutation} from "../../services/projectService";

interface CreateProjectModalProps {
    closeModalHandler: () => void
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({closeModalHandler}) => {
    const [createProject, {error}] = useCreateProjectMutation()
    const [project, setProject] = useState({
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

    const createProjectHandler = (e) => {
        e.preventDefault()
        createProject(project)
        closeModalHandler()

    }
    return (
        <div className={'block--light'}>
            <ProjectForm setProject={setProject}
                         project={project}
                         projectHandler={createProjectHandler}/>
        </div>
    );
};

export default CreateProjectModal;
