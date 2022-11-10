import React, {useState} from 'react';
import axios from "axios";
import {ITask} from "../../types/types";
import {useAppDispatch} from "../../hooks/redux";
import {closeModal} from "../../store/reducers/modalSlice";
import {addTask} from "../../store/reducers/suggestionSlice";

const Suggestion = () => {
    const [newTask, setNewTask] = useState<ITask>({
        title: '',
        body: ''
    })
    // useEffect(() => {
    //     setNewTask(task[0])
    // }, [task])
    // console.log(newTask, task)
    const dispatch = useAppDispatch()

    const sendIdea = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios.post('/suggestions/add', newTask)
            .then(r => {
                dispatch(addTask(r.data))
                dispatch(closeModal())
            })
            .catch(err => alert(err))
    }

    const updateIdea = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios.post('/suggestions/update', newTask)
    };

    return (
        <div className={'block--light shadow-2xl mx-8 flex flex-col gap-4'}>
            <label>
                Название
                <input type={'text'}
                       className={'bg-stone-700'}
                       value={newTask?.title}
                       onChange={e => setNewTask({...newTask, title: e.target.value})}/>
            </label>
            <label>
                Описание
                <input type={'text'}
                       className={'bg-stone-700'}
                       value={newTask?.body}
                       onChange={e => setNewTask({...newTask, body: e.target.value})}/>
            </label>
            {1 ? <button onClick={sendIdea} className={'self-end px-6 bg-stone-700'}>Предложить</button> :
                <button onClick={(e) => updateIdea(e)} className={'self-end px-6'}>Обновить</button>}
        </div>
    )
};

export default Suggestion;
