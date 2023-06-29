export interface IUser {
    id: number;
    name: string;
    middleName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    birthday?: string;
    email: string;
    status?: string;
    about?: string;
    created_at?: string;
    updated_at?: string;
    rates: IRate[];
    role: IRole[]
}

interface IRate {
    id: number;
    project_id: number;
    user_id: number;
    rating: number;
}

interface IRole {
    id: number
    name: string
    custom_name: string | null
}
