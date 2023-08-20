import React, {FC} from "react";
import {IoIosHeart, IoIosHeartDislike} from "react-icons/io";
import {BsQuestionCircleFill} from "react-icons/bs";
import {IoTrashBin} from "react-icons/io5";
import {useGetUserQuery} from "services/userService";
import {useSetTaskStatusMutation} from "services/tasksService";
import {ITask} from "types/Task";

interface TaskActionsProps {
    task: ITask;
    hover: number;
}

const TaskActions: FC<TaskActionsProps> = ({task, hover}) => {
    const {data: user} = useGetUserQuery();
    const [setStatus, {}] = useSetTaskStatusMutation();
    const setStatusHandler = (e: React.MouseEvent<HTMLSpanElement>, id: number, status: number) => {
    e.preventDefault();
    setStatus({id, status});
  };
  // const [taskEdit, setTask] = useState(null);
  // const editTask = (e: React.MouseEvent<HTMLSpanElement>, id: number) => {
  //     e.preventDefault()
  //     setTask(tasks.filter(i => i.id === id))
  //     dispatch(setModal({
  //         title: 'Редактирование предложения',
  //         children: <Suggestion task={taskEdit}/>
  //     }))
  //};
  return (
    <div className={"flex-wrap absolute gap-1 right-0 top-0 p-2 " + (hover == task.id ? "flex" : "hidden")}>
      {user?.id === 1 &&
        <>
                    <span className={"bg-stone-700 p-2 rounded-lg cursor-pointer transition-all hover:bg-green-600"}
                          onClick={(e) => setStatusHandler(e, task.id, 1)}>
                        <IoIosHeart/>
                    </span>
          <span className={"bg-stone-700 p-2 rounded-lg cursor-pointer transition-all hover:bg-red-700"}
                onClick={(e) => setStatusHandler(e, task.id, 2)}
          >
                        <IoIosHeartDislike/>
                    </span>
          <span className={"bg-stone-700 p-2 rounded-lg cursor-pointer transition-all hover:bg-orange-500"}
                onClick={(e) => setStatusHandler(e, task.id, 3)}
          >
                        <BsQuestionCircleFill/>
                    </span>
          <span className={"bg-stone-700 p-2 rounded-lg cursor-pointer transition-all hover:bg-red-500"}
                onClick={(e) => setStatusHandler(e, task.id, 666)}>
                        <IoTrashBin/>
                    </span>
        </>
      }
      {/*<span className={'bg-stone-700 p-2 rounded-lg cursor-pointer transition-all hover:bg-blue-500'}*/}
      {/*      onClick={(e) => editTask(e, task.id)}><FaEdit/></span>*/}
    </div>
  );
};

export default TaskActions;
