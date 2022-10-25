import React, {FC, useState} from 'react';
import axios from "axios";
import ProjectForm from "./ProjectForm";
import BgCard from "../../components/bgCard";
import {closeModal} from "../../store/reducers/modalSlice";
import {useAppDispatch} from "../../hooks/redux";

const CreateProjectModal: FC = () => {
    const dispatch = useAppDispatch()
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
        axios.post('admin/createProject', project)
            .then(() => dispatch(closeModal()))
    }
    return (
        <BgCard>
            <ProjectForm setProject={setProject}
                         project={project}
                         projectHandler={createProjectHandler}/>
        </BgCard>
    );
};

export default CreateProjectModal;
