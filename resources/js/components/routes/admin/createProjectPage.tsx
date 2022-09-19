import React, {FC, useState} from 'react';
import BgCard from "../../bgCard";
import axios from "axios";
import ProjectForm from "./ProjectForm";

const CreateProjectPage: FC = () => {
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
    }


    return (
        <div className={'p-4 flex flex-col items-center'}>
            <BgCard>
                <ProjectForm project={project}
                             setProject={setProject}
                             projectHandler={createProjectHandler}/>
            </BgCard>
        </div>
    );
};

export default CreateProjectPage;
