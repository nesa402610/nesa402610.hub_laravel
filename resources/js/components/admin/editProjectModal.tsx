import React, {FC, useState} from 'react';
import ProjectForm from "./ProjectForm";
import axios from "axios";
import BgCard from "../../components/bgCard";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {closeModal} from "../../store/reducers/modalSlice";

interface editProjectPageProps {
    id: number
}

const EditProjectModal: FC<editProjectPageProps> = ({id}) => {
    const [project, setProject] = useState(
        useAppSelector(state => state.homePage.projects.filter(item => item.id === id)[0])
    )
    const dispatch = useAppDispatch()

    const updateHandler = (e) => {
        e.preventDefault()
        axios.put('/admin/updateProject/' + project.id, project).then(() => dispatch(closeModal()))
    }
    return (
        <BgCard>
            {project && <ProjectForm setProject={setProject} project={project} projectHandler={updateHandler}/>}
        </BgCard>
    );
};

export default EditProjectModal;
