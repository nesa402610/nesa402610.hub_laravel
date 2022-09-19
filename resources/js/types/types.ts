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
export interface ILevel {
    ico: any,
    grade: number,
    name: string
}
export interface ISiteProps {
    site: ISite
}
export interface ISite {
    name: string,
    source?: string,
    sourceUrl?: string,
    img?: string | null,
    url?: string,
    state: string,
    level: ILevel,
    framework?: string,
    stack: string[],
    host: any
}
