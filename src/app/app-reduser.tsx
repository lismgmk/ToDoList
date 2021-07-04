import {ChangeToDoListTitleAT, RemoveToDoListAT} from "../features/todoListsList/toDoListReduser";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
            case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status : RequestStatusType)=> ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error : string | null)=> ({type: 'APP/SET-ERROR', error } as const)

export type setAppStatusACType= ReturnType<typeof setAppStatusAC>
export type setAppErrorACType= ReturnType<typeof setAppErrorAC>

type ActionsType =
    | setAppStatusACType
    | setAppErrorACType

