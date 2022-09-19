import React, {FC, useEffect, useState} from 'react';
import ProjectForm from "./ProjectForm";
import BgCard from "../../bgCard";
import axios from "axios";
import {useParams} from "react-router-dom";

const EditProjectPage: FC = () => {
    const [project, setProject] = useState()
    const params = useParams()
    console.log(params)
    useEffect(() => {
        axios.get('/admin/editProject/' + params.id).then(r => setProject(r.data)).catch(err => alert(err))
    }, [])

    const updateHandler = (e) => {
        e.preventDefault()
        axios.put('/admin/updateProject/' + params.id, project)
    }
    return (
        <div className={'p-4 flex-col flex items-center'}>
            <BgCard>
                {project && <ProjectForm setProject={setProject} project={project} projectHandler={updateHandler}/>}
            </BgCard>
        </div>
    );
};

export default EditProjectPage;
