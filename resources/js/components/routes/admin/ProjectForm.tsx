import React, {FC} from 'react';
import FgCard from "../../fgCard";
import Input from "../../UI/input";
import {IProject} from "../../../types/types";


interface createProjectFormProps {
    project: IProject,
    setProject: any
    projectHandler: any
}


const ProjectForm: FC<createProjectFormProps> = ({projectHandler, project, setProject}) => {
    return (
        <form className={'w-full flex flex-col items-center'}>
            <div className={'grid mb-4 grid-cols-3 gap-4'}>
                <FgCard>
                    <label> Название </label>
                    <Input type={'text'}
                           value={project.name}
                           onChange={e => setProject({...project, name: e.target.value})}/>
                </FgCard>
                <FgCard>
                    <label> Источник </label>
                    <Input type={'text'} value={project.source}
                           onChange={e => setProject({...project, source: e.target.value})}/>
                </FgCard>
                <FgCard>
                    <label> Ссылка на источник </label>
                    <Input type={'text'} value={project.sourceURL}
                           onChange={e => setProject({...project, sourceURL: e.target.value})}/>
                </FgCard>
                <FgCard>
                    <label> Ссылка на превью </label>
                    <Input type={'text'} value={project.previewURL}
                           onChange={e => setProject({...project, previewURL: e.target.value})}/>
                </FgCard>
                <FgCard>
                    <label> Ссылка на изображение </label>
                    <Input type={'text'} value={project.image}
                           onChange={e => setProject({...project, image: e.target.value})}/>
                </FgCard>
                <FgCard>
                    <label> Статус </label>
                    <select value={project.status}
                            className={'w-full p-2 outline-0 autofill:bg-stone-600 rounded-lg mt-1 bg-stone-600'}
                            onChange={e => setProject({...project, status: e.target.value})}>
                        <option value="Planned">Запланированно</option>
                        <option value="Completed">Завершено</option>
                        <option value="In work">В работе</option>
                        <option value="Dropped">Брошено</option>
                    </select>
                </FgCard>
                <FgCard>
                    <label> Уровень </label>
                    <select value={project.level}
                            className={'w-full p-2 outline-0 autofill:bg-stone-600 rounded-lg mt-1 bg-stone-600'}
                            onChange={e => setProject({...project, level: e.target.value})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </FgCard>
                <FgCard>
                    <label>Хостинг</label>
                    <Input type={'text'} value={project.host}
                           onChange={e => setProject({...project, host: e.target.value})}/>
                </FgCard>
                <FgCard>
                    <label>Github</label>
                    <Input type={'text'}
                           value={project.github}
                           onChange={e => setProject({...project, github: e.target.value})}/>
                </FgCard>
            </div>

            <FgCard className={'w-1/3 hover:bg-stone-500 p-0 transition-all'}>
                {project.id ? <button className={'w-full p-4'} onClick={projectHandler}>Обновить</button> :
                    <button className={'w-full p-4'} onClick={projectHandler}>Создать</button>}
            </FgCard>

        </form>
    );
};

export default ProjectForm;
