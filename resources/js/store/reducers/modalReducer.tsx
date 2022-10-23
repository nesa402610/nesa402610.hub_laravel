import {IActionProps} from "../../types/types";
import React from "react";

const defaultState = {
    title: '',
    isModal: false,
    children: null
}

interface modalReducerProps {
    title: string
    isModal: boolean
    children?: React.ReactNode
}

const SET_MODAL = 'SET_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
export const modalReducer = (state = defaultState, action: IActionProps): modalReducerProps => {
    switch (action.type) {
        case SET_MODAL:
            return {title: action.payload.title, isModal: true, children: action.payload.children}
        case CLOSE_MODAL:
            return {...state, title: '', isModal: false, children: null}
        default:
            return state
    }
}

export const setModalAction = (payload) => ({type: SET_MODAL, payload})
export const closeModalAction = () => ({type: CLOSE_MODAL})
