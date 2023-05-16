import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICollection} from "../../types/types";

const initialState: collectionSlice = {
    filter: {
        title: '',
        tags: [],
        type: 'anime'
    },
    filteredCollection: []
}

interface collectionSlice {
    filter: collectionFilter
    filteredCollection: ICollection[]
}

interface collectionFilter {
    title: string
    tags: string[]
    type: string
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
        clearFilter(state) {
            state.filter.title = ''
            state.filter.tags = []
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
    clearFilter
} = collectionSlice.actions
