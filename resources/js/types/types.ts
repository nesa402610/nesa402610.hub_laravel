export interface IUser {
    id: number
    name: string
    middleName?: string
    lastName?: string
    phone?: string
    avatar?: string
    birthday?: string
    email: string
    status?: string
    about?: string
    created_at?: string
    updated_at?: string
    rates: IRate[]
}

interface IRate {
    id: number
    project_id: number
    user_id: number
    rating: number
}

// export interface ILevel {
//     ico: any,
//     grade: number,
//     name: string
// }
export interface IProjectProps {
    project: IProject
}

export interface IProject {
    id?: number
    name: string,
    sourceURL?: string,
    source?: string,
    previewURL?: string,
    image?: string | null,
    status: string,
    level: number,
    framework?: string,
    stack?: string,
    host: string
    rate?: number
    github?: string
}

export interface IActionProps {
    type: string
    payload?: any
}

export interface ICert {
    name: string,
    author: string,
    date: string,
    sign: string,
    img: string,
}

export interface IPost {
    id?: number
    userId?: number
    title: string
    body: string
    image: string
    comments?: IComment[]
    visibility?: number
    created_at?: string
    updated_at?: string
}

export interface IComment {
    id: number
    post_id: number
    body: string
    created_at?: string
    updated_at?: string
    user_id: number
    user: IUser
}
export interface ITask {
    id?: number
    title: string
    body: string
    status?: number
    created_at?: string
    updated_at?: string
}
