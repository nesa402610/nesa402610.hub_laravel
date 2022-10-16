import React, {FC, useState} from 'react';
import axios from "axios";
import ProjectForm from "./ProjectForm";
import {useDispatch} from "react-redux";
import {closeModalAction} from "../../store/modalReducer";
import BgCard from "../../components/bgCard";

const CreateProjectModal: FC = () => {
    const dispatch = useDispatch()
    const [project, setProject] = useState({
        name: '',
        source: '',
        sourceURL: '',
        previewURL: '',
        status: 'Planned',
        level: 1,
        host: '',
        image: null
    })

    const createProjectHandler = (e) => {
        e.preventDefault()
        axios.post('admin/createProject', project)
            .then(() => dispatch(closeModalAction()))
    }
    return (
        <BgCard>
            <ProjectForm setProject={setProject}
                         projectHandler={createProjectHandler}/>
        </BgCard>
    );
};

export default CreateProjectModal;
