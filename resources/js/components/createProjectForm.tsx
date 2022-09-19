import React, {FC} from 'react';
import FgCard from "./fgCard";
import Input from "./UI/input";

interface createProjectFormProps {
    project: projectProps,
    setProject: any
    createProjectHandler: any
}

interface projectProps {
    name: string
    source: string
    sourceUrl: string
    previewUrl: string
    host: string
    image: string
}

const CreateProjectForm: FC<createProjectFormProps> = ({
                                                           createProjectHandler,
                                                           project,
                                                           setProject
                                                       }: createProjectFormProps) => {
    return (
        <form className={'flex flex-col gap-4 w-full'}>
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
                <Input type={'text'} value={project.sourceUrl}
                       onChange={e => setProject({...project, sourceUrl: e.target.value})}/>
            </FgCard>
            <FgCard>
                <label> Ссылка на превью </label>
                <Input type={'text'} value={project.previewUrl}
                       onChange={e => setProject({...project, previewUrl: e.target.value})}/>
            </FgCard>
            <FgCard>
                <label> Ссылка на изображение </label>
                <Input type={'text'} value={project.image}
                       onChange={e => setProject({...project, image: e.target.value})}/>
            </FgCard>
            <FgCard>
                <label> Статус </label>
                <select
                    onChange={e => setProject({...project, state: e.target.value})}>
                    <option value="Planned" selected>Запланированно</option>
                    <option value="Completed">Завершено</option>
                    <option value="In work">В работе</option>
                    <option value="Dropped">Брошено</option>
                </select>
            </FgCard>
            <FgCard>
                <label> Уровень </label>
                <select
                    onChange={e => setProject({...project, level: e.target.value})}>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </FgCard>
            <FgCard>
                <label htmlFor="">Хостинг</label>
                <Input type={'text'} value={project.host}
                       onChange={e => setProject({...project, host: e.target.value})}/>
            </FgCard>
            <FgCard>
                <button onClick={createProjectHandler}>Создать</button>
            </FgCard>
        </form>
    );
};

export default CreateProjectForm;
