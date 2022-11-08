import React, {useEffect, useState} from 'react';
import axios from "axios";
import FgCard from "../fgCard";
import Input from "../UI/input";
import SubmitButton from "../UI/submitButton";
import {ITask} from "../../types/types";
import {useAppDispatch} from "../../hooks/redux";
import {closeModal} from "../../store/reducers/modalSlice";
import {addTask} from "../../store/reducers/suggestionSlice";

const Suggestion = ({task}) => {
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
        <FgCard className={'mx-8 flex flex-col gap-4'}>
            <label>
                Название
                <Input type={'text'}
                       value={newTask?.title}
                       onChange={e => setNewTask({...newTask, title: e.target.value})}/>
            </label>
            <label>
                Описание
                <Input type={'text'}
                       value={newTask?.body}
                       onChange={e => setNewTask({...newTask, body: e.target.value})}/>
            </label>
            {1 ? <SubmitButton onClick={sendIdea} className={'self-end px-6'}>Предложить</SubmitButton> :
                <SubmitButton onClick={(e) => updateIdea(e)} className={'self-end px-6'}>Обновить</SubmitButton>}
        </FgCard>
    )
};

export default Suggestion;
