import React from 'react';
import ContextMenu from "components/UI/ContextMenu/ContextMenu";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import useDropdown from "hooks/useDropdown";
import {useSetTaskStatusMutation} from "services/tasksService";
import {IoIosHeart, IoIosHeartDislike} from "react-icons/io";
import ContextItem from "components/UI/ContextMenu/ContextItem";
import {BsQuestionCircleFill} from "react-icons/bs";
import AdminChecker from "components/AdminChecker";
import {IoCheckmarkCircleSharp} from "react-icons/io5";

enum taskStatus {
}

const SuggestionCard = ({task}) => {
    const {isOpen, setIsOpen, toggleHandle, nav, pos} = useDropdown(false)
    const [setStatus, {}] = useSetTaskStatusMutation();

    const setStatusHandle = (id: number, status: number) => {
        setStatus({id, status})
            .unwrap()
            .then(() => setIsOpen(false))
    }


    return (
        <div key={task.id}
             onContextMenu={toggleHandle}
             onTouchStart={toggleHandle}
             onTouchEnd={() => setIsOpen(false)}
             className={"block--light flex md:flex-row xs:flex-col justify-between relative border-2 " + (task.status === 1 ? "border-green-600 border-2" : task.status === 2 ? "opacity-60 border-red-700 " : task.status === 3 ? "border-amber-700 border-2" : task.status === 4 ? 'opacity-60' : "border-0")}>
            {isOpen &&
                <ContextMenu contextMenu={isOpen} setContextMenu={setIsOpen} position={pos}
                             deleteFn={() => setStatusHandle(task.id, 666)} adminOnly>
                    <AdminChecker>
                        <>
                            <ContextItem onClick={() => setStatusHandle(task.id, 4)}
                                         text={'Реализовано'} color={'text-neutral-300'}
                                         icon={<IoCheckmarkCircleSharp/>}/>
                            <ContextItem onClick={() => setStatusHandle(task.id, 1)}
                                         text={'К реализации'} color={'text-green-300'}
                                         icon={<IoIosHeart/>}/>
                            <ContextItem onClick={() => setStatusHandle(task.id, 3)}
                                         text={'Возможно'} color={'text-amber-400'}
                                         icon={<BsQuestionCircleFill/>}/>
                            <ContextItem onClick={() => setStatusHandle(task.id, 2)}
                                         text={'Точно нет'} color={'text-amber-600'}
                                         icon={<IoIosHeartDislike/>}/>
                        </>
                    </AdminChecker>
                </ContextMenu>
            }
            <div>
                <div>
                    <span className={"italic font-bold"}>{task.title}</span>
                </div>
                <div className={"overflow-hidden overflow-ellipsis"}>
                    <span>{task.body}</span>
                </div>
            </div>
            <div className={"flex flex-col items-end"}
            >
                <span>{moment(task.created_at).format("DD.MM.YYYY HH:MM:ss")}</span>
                <div className={"flex gap-4 whitespace-nowrap"}>
                            <span>
                                {task.status === 1 ? "К реализации" : task.status === 2 ? "Отсеяно" : task.status === 3 ? "Возможно" : task.status === 4 ? 'Реализовано' : "Не рассмотрено"}
                        </span>
                    <Link to={"/profile/" + task.author}>{task.user.name} {task.user.lastName}</Link>
                </div>
            </div>
        </div>
    );
};

export default SuggestionCard;
