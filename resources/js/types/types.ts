export interface IUser {
    id: number
    name: string
    middleName?: string
    lastName?: string
    phone?: string
    avatar?: string
    birthday?: string
    email: string
    created_at?: string
    updated_at?: string
    rates: IRate[]
}
interface IRate {
    id: number
    project_id: number
    user_id:number
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
    id: number
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
export interface ICertProps {
    name: string,
    author: string,
    date: string,
    sign: string,
    img: string,
}
