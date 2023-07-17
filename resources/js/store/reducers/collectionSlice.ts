import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: collectionSlice = {
    filter: {
        title: '',
        tags: [],
        type: 'anime',
        rating: '',
        IPP: 15
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
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setFilterType(state, action: PayloadAction<string>) {
            state.filter.type = action.payload
        },
        setFilter(state, action: PayloadAction<collectionFilter>) {
            state.filter.title = action.payload.title
            state.filter.tags = action.payload.tags
            state.filter.rating = action.payload.rating
            state.filter.IPP = action.payload.IPP
        },
        clearFilter(state) {
            state.filter.title = ''
            state.filter.tags = []
            state.filter.rating = ''
            state.filter.IPP = 15
        },
    },
})

export default collectionSlice.reducer
export const {
    setFilterType,
    setFilter,
    clearFilter,
} = collectionSlice.actions
