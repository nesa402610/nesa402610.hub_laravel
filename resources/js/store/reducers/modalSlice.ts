import {createSlice} from "@reduxjs/toolkit";
import React from "react";

const initialState: modalState = {
    title: '',
    isModal: false,
    children: null
}

interface modalState {
    title: string
    isModal: boolean
    children?: React.ReactNode
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal(state, action) {
            state.title = action.payload.title
            state.isModal = true
            state.children = action.payload.children
        },
        closeModal(state) {
            state.title = ''
            state.isModal = false
            state.children = null
        }
    }
})

export default modalSlice.reducer
export const {setModal, closeModal} = modalSlice.actions
