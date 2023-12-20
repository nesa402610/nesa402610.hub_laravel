import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface IKinopoiskItem {
    ageRating: number
    alternativeName: string
    backdrop: { url: string }
    countries: { name: string }[]
    description: string
    enName: string
    genres: { name: string }[]
    id: number
    isSeries: boolean
    logo: { url: string }
    movieLength: number
    name: string
    names: { name: string }
    rating: { kp: number, imdb: number, filmCritics: number, russianFilmCritics: number, await: any }
    ratingMpaa: string
    seriesLength: any
    shortDescription: string
    status: any
    ticketsOnSale: boolean
    top10: any
    top250: number
    poster: {
        previewUrl: string;
        url: string
    }
    totalSeriesLength: any
    type: string
    typeNumber: number
    votes: { kp: number, imdb: number, filmCritics: number, russianFilmCritics: number, await: number }
    year: number
}

interface IKinopoisk {
    docs: IKinopoiskItem[]
    limit: string
    page: number
    pages: string
    total: string
}

export interface KinopoiskParams {
    page: number,
    limit: string,
    // selectFields: string[],
    // notNullFields: string[]
    sortField: string
    sortType: string
    id?: string[]
    'externalId.imdb'?: string[]
    'externalId.tmdb'?: string[]
    type: string
    typeNumber?: number
    isSeries?: boolean
    year: string
    'rating.kp': string
    ageRating: string
    movieLength?: string
    'genres.name'?: string
    'countries.name'?: string[]


}

export const kinopoiskAPI = createApi({
    reducerPath: 'kinopoiskAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.kinopoisk.dev/',
        prepareHeaders: (headers) => {
            headers.set('X-API-KEY', '3X4HBFV-B2849FC-QX6YK7R-TJH5P77\n')
            return headers
        },
    }),
    tagTypes: ['Kinopoisk', 'genres'],
    endpoints: build => ({
        getKinopoiskData: build.query<IKinopoisk, KinopoiskParams>({
            query: (params) => ({
                url: '/v1.4/movie',
                params: params
            }),
            providesTags: ['Kinopoisk']
        }),
        getKinopoiskSubData: build.query<{ name: string, slug: string }[], string>({
            query: (value = 'genres.name') => ({
                url: '/v1/movie/possible-values-by-field',
                params: {field: value},
            }),
            providesTags: ['genres']
        }),
        getKinopoiskDataByName: build.query<IKinopoisk, string>({
            query: (name) => ({
                url: '/v1.4/movie/search',
                params: {query: name}
            }),
            providesTags: ['Kinopoisk']
        }),
    })
})
export const {
    useGetKinopoiskDataQuery, useGetKinopoiskSubDataQuery,
    useLazyGetKinopoiskDataByNameQuery
} = kinopoiskAPI
