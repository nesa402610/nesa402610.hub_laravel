import React, {useState} from 'react';
import {useAddTaskMutation, useUpdateTaskMutation} from "services/tasksService";

const Suggestion = ({closeHandler}) => {
    const [newTask, setNewTask] = useState({
        title: '',
        body: ''
    })
    const [addTask, {}] = useAddTaskMutation()
    const [updateTask, {}] = useUpdateTaskMutation()

    const sendIdea = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addTask(newTask)
        closeHandler()
    }

    const updateIdea = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        updateTask(newTask)
    };

    return (
        <div className={'block--light shadow-2xl mx-8 flex flex-col gap-4'}>
            <label>
                Название
                <input type={'text'}
                       value={newTask?.title}
                       onChange={e => setNewTask({...newTask, title: e.target.value})}/>
            </label>
            <label>
                Описание
                <input type={'text'}
                       value={newTask?.body}
                       onChange={e => setNewTask({...newTask, body: e.target.value})}/>
            </label>
            {1 ? <button onClick={sendIdea} className={'self-end px-6'}>Предложить</button> :
                <button onClick={(e) => updateIdea(e)} className={'self-end px-6'}>Обновить</button>}
        </div>
    )
};

export default Suggestion;
