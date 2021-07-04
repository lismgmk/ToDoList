import {setAppErrorACType, setAppStatusAC, setAppStatusACType} from "../../app/app-reduser";
import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {initialazedAPI} from "../../api/initialazed-api";



export const loginReduser = (state: initialStateLoginType = {isLoggedIn: false, initialazed: false}, action: ActionType): initialStateLoginType => {
    switch (action.type) {
        case "LOGIN/IS-LOGGED":
            return {...state, isLoggedIn: action.isLoggedIn}
            case "LOGIN/IS-INITIALAZED":
            return {...state, initialazed: action.initialazed}
        default:
            return state
    }
}

export const isLoggedInAC = (isLoggedIn: boolean) => ({type: "LOGIN/IS-LOGGED", isLoggedIn} as const)
export const isInitialazedAC = (initialazed: boolean) => ({type: "LOGIN/IS-INITIALAZED", initialazed} as const)



export const fetchFormThunkAT = (model: modelLoginStateType) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.fetchForm(model)
        .then(data => {
            if (data.data.resultCode === 0) {
                    dispatch(isLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(data.data, dispatch)
                }
            }
        )
}

export const initialazedThunkAT = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(isInitialazedAC(true))
    debugger
    initialazedAPI.isLoged()
        .then(data => {
            debugger
            if (data.data.resultCode === 0) {
                dispatch(isInitialazedAC(false))
                dispatch(isLoggedInAC(true))
                } else {
                    handleServerAppError(data.data, dispatch)
                dispatch(isInitialazedAC(false))
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
            // dispatch(isInitialazedAC(false))
        })
}
export const logoutThunkAT = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(isInitialazedAC(true))
    initialazedAPI.logOut()
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(isLoggedInAC(false))
                dispatch(isInitialazedAC(false))
                dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(data.data, dispatch)
                dispatch(isInitialazedAC(false))
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(isInitialazedAC(false))
        })
}




type ActionType =
    | ReturnType<typeof isLoggedInAC>
    | ReturnType<typeof isInitialazedAC>
    | setAppStatusACType | setAppStatusACType | setAppErrorACType


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

