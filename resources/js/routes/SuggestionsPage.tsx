import React, {FC, useState} from "react";
import Suggestion from "../components/modals/suggestion";
import moment from "moment";
import Task__actions from "../components/admin/Task__actions";
import {Link} from "react-router-dom";
import {useGetUserQuery} from "../services/userService";
import {useGetTasksQuery} from "../services/tasksService";
import Modal from "../components/UI/modal";
import Loader from "../components/Loader";


const SuggestionsPage: FC = () => {
    const [isModal, setIsModal] = useState(false);
    const {data: isAuth} = useGetUserQuery();
    const {data: tasks, isLoading} = useGetTasksQuery();
    const [hover, setHover] = useState(0);

    const addNewIdea = () => {
        setIsModal(true);
    };
    const closeHandler = () => {
        setIsModal(false);
    };
    const adminMenu = (id) => {
        setHover(id);
  };
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
          <div key={task.id}
               className={"block--light flex md:flex-row xs:flex-col justify-between relative border-2 " + (task.status === 1 ? "border-green-600 border-2" : task.status === 2 ? "opacity-60 border-red-700 " : task.status === 3 ? "border-amber-700 border-2" : "border-0")}>
              <div>
                  <div>
                      <span className={"italic font-bold"}>{task.title}</span>
                  </div>
                  <div className={"overflow-hidden overflow-ellipsis"}>
                      <span>{task.body}</span>
                  </div>
              </div>
              <div className={"flex flex-col items-end"}
                   onMouseEnter={() => adminMenu(task.id)}
                 onMouseLeave={() => setHover(0)}
            >
                  <span>{moment(task.created_at).format("DD.MM.YYYY HH:MM:ss")}</span>
                  <div className={"flex gap-4 whitespace-nowrap"}>
                            <span>
                                {task.status === 1 ? "К реализации" : task.status === 2 ? "Отсеяно" : task.status === 3 ? "Возможно" : "Не рассмотрено"}
                        </span>
                      <Link to={"/profile/" + task.author}>{task.user.name} {task.user.lastName}</Link>
                  </div>
                  <Task__actions hover={hover} task={task}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SuggestionsPage;
