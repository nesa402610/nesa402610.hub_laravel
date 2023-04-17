import {IUser} from "./User";

export interface ITask {
  id?: number;
  title: string;
  body: string;
  status?: number;
  author: number;
  user: IUser;
  created_at?: string;
  updated_at?: string;
}
