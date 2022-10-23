import React, {FC, useState} from 'react';
import axios from "axios";
import ProjectForm from "./ProjectForm";
import {useDispatch} from "react-redux";
import BgCard from "../../components/bgCard";
import {closeModalAction} from "../../store/reducers/modalReducer";

const CreateProjectModal: FC = () => {
    const dispatch = useDispatch()
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
            .then(() => dispatch(closeModalAction()))
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
