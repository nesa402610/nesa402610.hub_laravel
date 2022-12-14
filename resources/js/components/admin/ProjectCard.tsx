import React from 'react';
// @ts-ignore
import noImage from "../../img/noimage.png";
import ProjectInfo from "../projectCard/projectInfo";
import EditProjectModal from './editProjectModal';
import {setModal} from "../../store/reducers/modalSlice";
import {useAppDispatch} from "../../hooks/redux";

const ProjectCard = ({project}) => {
    const dispatch = useAppDispatch()
    const editProjectHandler = () => {
        dispatch(setModal({title: 'Изменение проекта',
            children: <EditProjectModal id={project.id}/>
        }))
    }
    return (
        <div onClick={editProjectHandler}
              className={'projectCard relative flex flex-col rounded-xl overflow-hidden border-2 border-stone-500'
                  + (project.status.toLowerCase() === 'planned' ? ' opacity-70 cursor-default planned' : ` ${project.status.toLowerCase()}`)}>
            <div className={'h-full'}>
                {project.image ? <img className={'w-full'} src={project.image} alt=""/> :
                    <div className={'h-full bg-cover bg-center'} style={{backgroundImage: `url(${noImage})`}}/>}
            </div>
            <ProjectInfo project={project}/>
        </div>
    );
};

export default ProjectCard;
