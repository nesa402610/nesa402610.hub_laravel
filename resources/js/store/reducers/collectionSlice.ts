import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: collectionSlice = {
    filter: {
        title: '',
        tags: [],
        type: 'anime',
        rating: '',
        kind: null,
        IPP: JSON.parse(localStorage.getItem('memFilter'))?.IPP ?? 15,
        sort: JSON.parse(localStorage.getItem('memFilter'))?.sort ?? 'id',
        years: {start: 1910, end: new Date().getFullYear() + 5}
    },
    // filteredCollection: []
}

interface collectionSlice {
    filter: collectionFilter
    // filteredCollection: ICollection[]
}

interface collectionFilter {
    title: string
    tags: string[]
    type?: string
    rating: string
    IPP: number
    sort: string
    kind: string
    years: { start: number, end: number }
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setFilterType(state, action: PayloadAction<string>) {
            state.filter.type = action.payload
        },
        setFilter(state, action: PayloadAction<collectionFilter>) {
            const {title, tags, type, kind, sort, IPP, rating, years} = action.payload
            state.filter.title = title
            state.filter.tags = tags
            state.filter.rating = rating
            state.filter.IPP = IPP
            state.filter.sort = sort
            state.filter.years = years
            state.filter.kind = kind

        },
        clearFilter(state) {
            state.filter.title = ''
            state.filter.tags = []
            state.filter.rating = ''
            state.filter.years = {start: 1910, end: new Date().getFullYear() + 5}
            state.filter.kind = null
        },
    },
})

export default collectionSlice.reducer
export const {
    setFilterType,
    setFilter,
    clearFilter,
} = collectionSlice.actions
