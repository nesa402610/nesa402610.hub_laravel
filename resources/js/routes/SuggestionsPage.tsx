import React, {FC, useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {setModal} from "../store/reducers/modalSlice";
import Suggestion from "../components/modals/suggestion";
import moment from "moment";
import Task__actions from "../components/admin/Task__actions";
import {Link} from "react-router-dom";
import {useGetUserQuery} from "../services/userService";
import {useGetTasksQuery} from "../services/tasksService";


const SuggestionsPage: FC = () => {
    const {data: isAuth} = useGetUserQuery('')
    const {data: tasks, isFetching} = useGetTasksQuery('')
    const [hover, setHover] = useState(0);
    const dispatch = useAppDispatch()

    const addNewIdea = () => {
        dispatch(setModal({
            title: 'Предложить идею',
            children: <Suggestion/>
        }))
    }
    const adminMenu = (id) => {
        setHover(id)
    }
if (isFetching) return <h1 className={'text-center font-bold text-2xl'}>Загрузка</h1>
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
