import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setModal} from "../store/reducers/modalSlice";
import Suggestion from "../components/modals/suggestion";
import {ITask} from "../types/types";
import moment from "moment";
import Task__actions from "../components/admin/Task__actions";
import {setTasks} from "../store/reducers/suggestionSlice";
import {Link} from "react-router-dom";


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
            children: <Suggestion/>
        }))
    }
    const adminMenu = (id) => {
        setHover(id)
    }

    return (
        <div className={'flex flex-col mx-4 gap-4'}>
            {isAuth &&
                <div className={'block--light'} onClick={addNewIdea}>
                    <h2>Предложить идею...</h2>
                </div>
            }
            {tasks.map(task =>
                <div key={task.id}
                     className={'block--light flex justify-between relative border-2 ' + (task.status === 1 ? 'border-green-600 border-2' : task.status === 2 ? 'opacity-60 border-red-700 ' : task.status === 3 ? 'border-amber-700 border-2' : 'border-0')}>
                    <div>
                        <div>
                            <span className={'italic font-bold'}>{task.title}</span>
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
                        <div className={'flex gap-4'}>
                            <span>
                                {task.status === 1 ? 'К реализации' : task.status === 2 ? 'Отсеяно' : task.status === 3 ? 'Возможно' : 'Не рассмотрено'}
                        </span>
                            <Link to={'/profile/' + task.author}>{task.user.name} {task.user.lastName}</Link>
                        </div>
                        <Task__actions hover={hover} task={task}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestionsPage;
