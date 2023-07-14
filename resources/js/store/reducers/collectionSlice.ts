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
        setFilterTitle(state, action: PayloadAction<string>) {
            state.filter.title = action.payload
        },
        setFilterType(state, action: PayloadAction<string>) {
            state.filter.type = action.payload
        },
        setFilterTags(state, action: PayloadAction<string[]>) {
            state.filter.tags = action.payload
        },
        setFilterRating(state, action: PayloadAction<string>) {
            state.filter.rating = action.payload
        },
        setFilterIPP(state, action: PayloadAction<number>) {
            state.filter.IPP = action.payload
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
        // setFilteredCollection(state, action) {
        //     const filteredByTitle = action.payload?.filter(c => c.title_ru.toLowerCase().includes(state.filter.title.toLowerCase()));
        //     state.filteredCollection = filteredByTitle?.filter(item => state.filter.tags.every(tf => item.tags?.map(it => it.name).includes(tf))
        //     );
        // }

    },
})

export default collectionSlice.reducer
export const {
    setFilterTitle,
    setFilterTags,
    setFilterType,
    setFilterRating,
    setFilterIPP,
    setFilter,
    clearFilter,
} = collectionSlice.actions
