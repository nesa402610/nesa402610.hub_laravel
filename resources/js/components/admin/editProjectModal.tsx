import React, {FC, useState} from 'react';
import ProjectForm from "./ProjectForm";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import BgCard from "../../components/bgCard";
import {closeModalAction} from "../../store/modalReducer";

interface editProjectPageProps {
    id: number
}

const EditProjectModal: FC<editProjectPageProps> = ({id}) => {
    const [project, setProject] = useState(
        useTypedSelector(state => state.homePage.projects.filter(item => item.id === id)[0])
    )
    const dispatch = useDispatch()

    const updateHandler = (e) => {
        e.preventDefault()
        axios.put('/admin/updateProject/' + project.id, project).then(() => dispatch(closeModalAction()))
    }
    return (
        <BgCard>
            {project && <ProjectForm setProject={setProject} project={project} projectHandler={updateHandler}/>}
        </BgCard>
    );
};

export default EditProjectModal;