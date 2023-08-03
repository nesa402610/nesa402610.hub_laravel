import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: collectionSlice = {
    filter: {
        title: '',
        tags: [],
        type: 'anime',
        rating: '',
        IPP: JSON.parse(localStorage.getItem('memFilter'))?.IPP ?? 15,
        sort: JSON.parse(localStorage.getItem('memFilter'))?.sort ?? 'id'
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
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setFilterType(state, action: PayloadAction<string>) {
            state.filter.type = action.payload
        },
        setFilter(state, action: PayloadAction<collectionFilter>) {
            const {title, tags, type, sort, IPP, rating} = action.payload
            state.filter.title = title
            state.filter.tags = tags
            state.filter.rating = rating
            state.filter.IPP = IPP
            state.filter.sort = sort

        },
        clearFilter(state) {
            state.filter.title = ''
            state.filter.tags = []
            state.filter.rating = ''
        },
    },
})

export default collectionSlice.reducer
export const {
    setFilterType,
    setFilter,
    clearFilter,
} = collectionSlice.actions
