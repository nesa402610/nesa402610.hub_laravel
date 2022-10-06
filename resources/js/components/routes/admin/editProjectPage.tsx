import React, {FC, useState} from 'react';
import ProjectForm from "./ProjectForm";
import BgCard from "../../bgCard";
import axios from "axios";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {closeModalAction} from "../../../store/modalReducer";

interface editProjectPageProps {
    id: number
}

const EditProjectPage: FC<editProjectPageProps> = ({id}) => {
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

export default EditProjectPage;
