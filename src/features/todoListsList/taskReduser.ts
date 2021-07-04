import {AddToDoListTypeAT, RemoveToDoListTypeAT, GetToDoListsTypeAT} from "./toDoListReduser";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TasksType, todolistAPI} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {
    RequestStatusType,
    setAppErrorAC,
    setAppErrorACType,
    setAppStatusAC,
    setAppStatusACType
} from "../../app/app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const taskReduser = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            let copySate = {...state}
            copySate[action.todolostId] = copySate[action.todolostId].filter(task => task.id !== action.taskId)
            return copySate

        case "GET-TASKS":
            return {...state, [action.toDoListId]: action.obj.map(task => ({...task, entityTaskStatus: 'idle'}))}
        case "ADDTASK":
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId], {...action.task, entityTaskStatus: 'idle'}]
            }
        case "CHANGE-ENTITY-TASK-STATUS":
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => task.id === action.taskId ?
                    {...task, entityTaskStatus: action.entityTaskStatus} : task)
            }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(ts => ts.id === action.taskId ? {...ts, ...action.model} : ts)
            }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.idToDoList]: []
            }
        }
        case "GET-TODOLISTS": {
            const stateCopy = {...state}
            action.ApiToDoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy

        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state};
            delete copyState[action.toDoListID]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolostId: string, taskId: string) => ({type: "REMOVE_TASK", todolostId, taskId} as const)
export const addTaskAC = (task: TasksType) => ({type: "ADDTASK", task}) as const
export const changeEntityTaskStatusAC = (toDoListId: string, taskId: string, entityTaskStatus: RequestStatusType) =>
    ({
        type: "CHANGE-ENTITY-TASK-STATUS",
        toDoListId,
        taskId,
        entityTaskStatus
    } as const)


export const updateTaskAC = (toDoListId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: "UPDATE_TASK",
    toDoListId,
    taskId,
    model
} as const)


export const getTasksAC = (toDoListId: string, obj: TasksType[]) => ({type: 'GET-TASKS', toDoListId, obj}) as const

export const fetchTasksThunkAT = (toDoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(toDoListId)
        .then(data => {
                dispatch(getTasksAC(toDoListId, data.data.items))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
}
export const removeTaskThunkAT = (toDoListId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityTaskStatusAC(toDoListId, taskId, 'loading'))
    todolistAPI.deleteTasks(toDoListId, taskId)
        .then(data => {
                dispatch(removeTaskAC(toDoListId, taskId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeEntityTaskStatusAC(toDoListId, taskId, 'succeeded'))
            }
        )
}
export const addTaskThunkAT = (toDoListId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.postTasks(toDoListId, title)
        .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(addTaskAC(data.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(data.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTaskThunkAT = (
    toDoListId: string,
    taskId: string,
    model: UpdateTaskModelType
) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    let state = getState().tasks
    let currentToDoList = state[toDoListId]
    let currentTask = currentToDoList.find(task => (task.id === taskId))

    if (currentTask) {
        let reqest = {
            title: currentTask.title,
            description: currentTask.description,
            status: currentTask.status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline,
            ...model
        }
        dispatch(setAppStatusAC('loading'))
        dispatch(changeEntityTaskStatusAC(toDoListId, taskId, 'loading'))
        todolistAPI.updateTasks(toDoListId, reqest, taskId)
            .then(data => {

                    if (data.data.resultCode === 0) {
                        dispatch(updateTaskAC(toDoListId, taskId, model))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeEntityTaskStatusAC(toDoListId, taskId, 'succeeded'))
                    } else {
                        handleServerAppError(data.data, dispatch)
                        // if (data.data.messages.length) {
                        //     dispatch(setAppErrorAC(data.data.messages[0]))
                        // } else {
                        //     dispatch(setAppErrorAC('Some error occured'))
                        // }
                        // dispatch(setAppStatusAC('failed'))
                    }
                }
            )
            .catch((error) => {
                // dispatch(setAppErrorAC(error.message))
                // dispatch(setAppStatusAC('failed'))
                handleServerNetworkError(error.message, dispatch)
            })
    } else {
        console.warn('task not found in the state')
        return
    }
}

export type changeEntityTaskStatusACType = ReturnType<typeof changeEntityTaskStatusAC>

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof getTasksAC>
    | AddToDoListTypeAT
    | RemoveToDoListTypeAT
    | GetToDoListsTypeAT
    | setAppStatusACType
    | setAppErrorACType
    | changeEntityTaskStatusACType

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string

}
export type TasksStateType = {
    [key: string]: Array<TasksDomainType>
}

export type TasksDomainType = TasksType & {
    entityTaskStatus: RequestStatusType
}