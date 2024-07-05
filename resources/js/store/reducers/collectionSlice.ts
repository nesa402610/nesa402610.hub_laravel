import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: collectionSlice = {
    filter: {
        title: '',
        tags: [],
        rating: '',
        kind: '',
        IPP: JSON.parse(localStorage.getItem('memFilter'))?.IPP ?? 15,
        sort: JSON.parse(localStorage.getItem('memFilter'))?.sort ?? 'id',
        years: {start: 2010, end: new Date().getFullYear() - 1}
    },
    options: {
        smallPreview: JSON.parse(localStorage.getItem('smallPreview')) || true
    }
    // filteredCollection: []
}

interface collectionSlice {
    filter: collectionFilter
    options: options
    // filteredCollection: ICollection[]
}

interface collectionFilter {
    title: string
    tags: string[]
    rating: string
    IPP: number
    sort: string
    kind: string
    years: { start: number, end: number }
}

interface options {
    smallPreview: boolean
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<collectionFilter>) {
            const {title, tags, kind, sort, IPP, rating, years} = action.payload
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
        changePreviewSize(state, action: PayloadAction<boolean>) {
            state.options.smallPreview = !state.options.smallPreview
            localStorage.setItem('memFilter', JSON.stringify(state.options.smallPreview))
        }
    },
})

export default collectionSlice.reducer
export const {
    setFilter,
    clearFilter,
    changePreviewSize,
} = collectionSlice.actions
