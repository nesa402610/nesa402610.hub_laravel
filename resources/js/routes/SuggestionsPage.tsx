import React, {FC, useState} from "react";
import Suggestion from "../components/modals/suggestion";
import {useGetUserQuery} from "services/userService";
import {useGetTasksQuery} from "services/tasksService";
import Modal from "../components/UI/modal";
import Loader from "../components/Loader";
import TaskCard from "components/Tasks/TaskCard";


const SuggestionsPage: FC = () => {
    const {data: isAuth} = useGetUserQuery();
    const {data: tasks, isLoading} = useGetTasksQuery();

    const [isModal, setIsModal] = useState(false);


    const addNewIdea = () => {
        setIsModal(true);
    };
    const closeHandler = () => {
        setIsModal(false);
    };
    // const adminMenu = (id) => {
    //     setHover(id);
    // };
    if (isLoading) return <Loader/>;
    return (
        <>
            <Modal title={"Новая задача"} isOpen={isModal} onClose={setIsModal}>
                <Suggestion closeHandler={closeHandler}/>
            </Modal>
            <div className={"flex flex-col m-4 gap-4"}>
                {isAuth &&
                    <div className={"block--light"} onClick={addNewIdea}>
                        <h2>Предложить идею...</h2>
                    </div>
                }
                {tasks.map(task =>
                    <TaskCard key={task.id} task={task}/>
                )}
            </div>
        </>
    );
};

export default SuggestionsPage;
