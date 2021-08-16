import { setAppStatusAC} from "../../app/app-reduser";
import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {initialazedAPI} from "../../api/initialazed-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ClearToDoAT } from "../todoListsList/toDoListReduser";

export const initialState: initialStateLoginType = {
    isLoggedIn: false,
    initialazed: false
};

const Slice = createSlice({
    name: 'LoginSlice',
    initialState: initialState,
    reducers: {
        isLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>){
            state.isLoggedIn = action.payload.isLoggedIn
        },
        isInitialazedAC(state, action: PayloadAction<{initialazed: boolean}>){
            state.initialazed = action.payload.initialazed
        }
    }
})

export const loginReduser = Slice.reducer

export const{isLoggedInAC, isInitialazedAC}  = Slice.actions



export const fetchFormThunkAT = (model: modelLoginStateType) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status :'loading'}))
    todolistAPI.fetchForm(model)
        .then(data => {
            if (data.data.resultCode === 0) {
                    dispatch(isLoggedInAC({isLoggedIn:true}))
                    dispatch(setAppStatusAC({status :'succeeded'}))
                } else {
                    handleServerAppError(data.data, dispatch)
                }
            }
        )
}

export const initialazedThunkAT = () => (dispatch: Dispatch<any>) => {
    dispatch(isInitialazedAC({initialazed: true}))

    initialazedAPI.isLoged()
        .then(data => {

            if (data.data.resultCode === 0) {
                dispatch(isInitialazedAC({initialazed: false}))
                dispatch(isLoggedInAC({isLoggedIn: true}))
                } else {
                    handleServerAppError(data.data, dispatch)
                dispatch(isInitialazedAC({initialazed: false}))
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
            // dispatch(isInitialazedAC(false))
        })
}
export const logoutThunkAT = () => (dispatch: Dispatch<any>) => {
    dispatch(isInitialazedAC({initialazed: true}))
    initialazedAPI.logOut()
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(ClearToDoAT({}))
                dispatch(isLoggedInAC({isLoggedIn:false}))
                dispatch(isInitialazedAC({initialazed: false}))
                dispatch(setAppStatusAC({status :'succeeded'}))
                } else {
                    handleServerAppError(data.data, dispatch)
                dispatch(isInitialazedAC({initialazed: false}))
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(isInitialazedAC({initialazed: false}))
        })
}

export type initialStateLoginType = {
    isLoggedIn: boolean
    initialazed: boolean
}

export type modelLoginStateType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

