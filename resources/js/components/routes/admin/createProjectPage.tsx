import React, {FC, useState} from 'react';
import BgCard from "../../bgCard";
import CreateProjectForm from "../../createProjectForm";
import axios from "axios";

const CreateProjectPage: FC = () => {
    const [project, setProject] = useState({
        name: '',
        source: '',
        sourceUrl: '',
        previewUrl: '',
        state: 'Planned',
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
                <CreateProjectForm project={project}
                                   setProject={setProject}
                                   createProjectHandler={createProjectHandler}/>
            </BgCard>
        </div>
    );
};

export default CreateProjectPage;
