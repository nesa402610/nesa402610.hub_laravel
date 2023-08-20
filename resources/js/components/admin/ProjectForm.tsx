import React, {FC} from 'react';
import {IProject} from "types/Project";

interface createProjectFormProps {
  project?: IProject,
  setProject: any
  projectHandler: any
}

const ProjectForm: FC<createProjectFormProps> = ({projectHandler, project, setProject}) => {
  if (!project) return null
  return (
    <form className={'w-full flex flex-col items-center'}>
      <div className={'grid mb-4 grid-cols-3 gap-4'}>
        <div className={'block--dark'}>
          <label> Название </label>
          <input type={'text'}
                 value={project.name}
                 required
                 onChange={e => setProject({...project, name: e.target.value})}/>
        </div>
        <div className={'block--dark'}>
          <label> Источник </label>
          <input type={'text'} value={project.source}
                 onChange={e => setProject({...project, source: e.target.value})}/>
        </div>
        <div className={'block--dark'}>
          <label> Ссылка на источник </label>
          <input type={'text'} value={project.sourceURL}
                 onChange={e => setProject({...project, sourceURL: e.target.value})}/>
        </div>
        <div className={'block--dark'}>
          <label> Ссылка на превью </label>
          <input type={'text'} value={project.previewURL}
                 onChange={e => setProject({...project, previewURL: e.target.value})}/>
        </div>
        <div className={'block--dark'}>
          <label> Ссылка на изображение </label>
          <input type={'text'} value={project.image}
                 onChange={e => setProject({...project, image: e.target.value})}/>
        </div>
        <div className={'block--dark'}>
          <label> Статус </label>
          <select value={project.status}
                  className={'w-full p-2 outline-0 autofill:bg-neutral-600 rounded-lg mt-1 bg-neutral-600'}
                  onChange={e => setProject({...project, status: e.target.value})}>
            <option value="Planned">Запланированно</option>
            <option value="Completed">Завершено</option>
            <option value="In work">В работе</option>
            <option value="Dropped">Брошено</option>
          </select>
        </div>
        <div className={'block--dark'}>
          <label> Уровень </label>
          <select value={project.level}
                  className={'w-full p-2 outline-0 autofill:bg-neutral-600 rounded-lg mt-1 bg-neutral-600'}
                  onChange={e => setProject({...project, level: e.target.value})}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={'block--dark'}>
          <label>Хостинг</label>
          <input type={'text'} value={project.host}
                 onChange={e => setProject({...project, host: e.target.value})}/>
        </div>
        <div className={'block--dark'}>
          <label>Github</label>
          <input type={'text'}
                 value={project.github}
                 onChange={e => setProject({...project, github: e.target.value})}/>
        </div>
      </div>
      {project.id ? <button className={'w-full p-4'} onClick={projectHandler}>Обновить</button> :
        <button className={'w-full p-4'} onClick={projectHandler}>Создать</button>}
    </form>
  );
};

export default ProjectForm;
