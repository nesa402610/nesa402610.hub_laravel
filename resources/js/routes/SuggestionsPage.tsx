import React, {FC, useEffect, useState} from 'react';
import BgCard from "../components/bgCard";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setModal} from "../store/reducers/modalSlice";
import Suggestion from "../components/modals/suggestion";
import {ITask} from "../types/types";
import moment from "moment";
import Task__actions from "../components/admin/Task__actions";
import {setTasks} from "../store/reducers/suggestionSlice";


const SuggestionsPage: FC = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    const {tasks} = useAppSelector(state => state.tasks)
    const [hover, setHover] = useState(0);
    const dispatch = useAppDispatch()
    useEffect(() => {
        axios.get<ITask[]>('/suggestions')
            .then(r => {
                dispatch(setTasks(r.data))
                // const sort = r.data.sort(a => {
                //     if (a.status === 1) return -1
                //     if (a.status === 2) return 1
                //     // if (a.status === 0) return 0
                //     if (a.status === 3) return 1
                // })
                // setTasks(sort)
            })
    }, []);

    const addNewIdea = () => {
        dispatch(setModal({
            title: 'Предложить идею',
            children: <Suggestion task={null}/>
        }))
    }
    const adminMenu = (id) => {
        setHover(id)
    }

    return (
        <div className={'flex flex-col mx-4 gap-4'}>
            {isAuth &&
                <BgCard onClick={addNewIdea}>
                    <h2>Предложить идею...</h2>
                </BgCard>
            }
            {tasks.map(task =>
                <BgCard key={task.id}
                        className={'relative border-2 ' + (task.status === 1 ? 'border-green-600 border-2' : task.status === 2 ? 'opacity-60 border-red-700 ' : task.status === 3 ? 'border-amber-700 border-2' : 'border-0')}>
                    <div>
                        <div className={'flex justify-between'}>
                            <span>{task.title}</span>
                        </div>
                        <div className={'overflow-hidden overflow-ellipsis'}>
                            <span>{task.body}</span>
                        </div>
                    </div>
                    <div className={'flex flex-col items-end'}
                         onMouseEnter={() => adminMenu(task.id)}
                         onMouseLeave={() => setHover(0)}
                    >
                        <span>{moment(task.created_at).format('DD.MM.YYYY HH:MM:ss')}</span>
                        <span>
                                {task.status === 1 ? 'К реализации' : task.status === 2 ? 'Отсеяно' : task.status === 3 ? 'Возможно' : 'Не рассмотрено'}
                        </span>
                        <Task__actions hover={hover} task={task} tasks={tasks}/>
                    </div>
                </BgCard>
            )}
        </div>
    );
};

export default SuggestionsPage;
