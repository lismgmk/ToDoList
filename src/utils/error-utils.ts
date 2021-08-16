import { Dispatch } from 'redux';
import {setAppErrorAC,  setAppStatusAC} from "../app/app-reduser";
import {TasksPostTypeResp} from "../api/todolist-api";

// generic function
export const handleServerAppError = <T>(data: TasksPostTypeResp<T>, dispatch: Dispatch<any>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<any>) => {
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}


