import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "types/Task";

const initialState: homePageProps = {
  tasks: [],
  isLoading: false,
  error: null
};

interface homePageProps {
  tasks: ITask[];
  isLoading: boolean;
  error: string;
}

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.unshift(action.payload);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setStatus(state, action) {
      state.tasks.map(t => (t.id === action.payload.id)
        ?
        t.status = action.payload.status : t
      );
    }
  }
});

export default suggestionSlice.reducer;
export const {setTasks, addTask, deleteTask, setStatus} = suggestionSlice.actions;
