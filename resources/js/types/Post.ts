import {IUser} from "./User";


export interface IPost {
  id?: number;
  userId?: number;
  title: string;
  body: string;
  image: string;
  comments?: IComment[];
  visibility?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IComment {
  id: number;
  post_id: number;
  body: string;
  created_at?: string;
  updated_at?: string;
  user_id: number;
  user: IUser;
}
