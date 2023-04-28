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
export interface ICert {
  name: string,
  author: string,
  date: string,
  sign: string,
  img: string,
}
export interface IProjectProps {
  project: IProject
}
