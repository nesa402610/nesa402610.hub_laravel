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
}
// export interface ILevel {
//     ico: any,
//     grade: number,
//     name: string
// }
export interface ISiteProps {
    project: ISite
}
export interface ISite {
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
}
