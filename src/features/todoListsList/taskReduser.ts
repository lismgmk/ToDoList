import {AddToDoListTypeAT, RemoveToDoListAT, GetToDoListsAT, SliceToDo, AddToDoListAT, ClearToDoAT} from "./toDoListReduser";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TasksType, todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {
    RequestStatusType,
    setAppStatusAC,
} from "../../app/app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksStateType = {}

const Slice = createSlice({
    name: 'TaskSlice',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolostId: string, taskId: string }>) {
            const index = state[action.payload.todolostId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolostId].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TasksType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityTaskStatus: 'idle'})
        },
        changeEntityTaskStatusAC(state, action: PayloadAction<{ toDoListId: string, taskId: string, entityTaskStatus: any }>) {


            const index = state[action.payload.toDoListId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) state[action.payload.toDoListId][index] = {
                ...state[action.payload.toDoListId][index],
                entityTaskStatus: action.payload.entityTaskStatus
            }

        },
        updateTaskAC(state, action: PayloadAction<{ toDoListId: string, taskId: string, model: UpdateTaskModelType }>) {

            const index = state[action.payload.toDoListId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) state[action.payload.toDoListId][index] = {...state[action.payload.toDoListId][index], ...action.payload.model}

        },
        getTasksAC(state, action: PayloadAction<{ toDoListId: string, obj: TasksType[] }>) {
            state[action.payload.toDoListId] = action.payload.obj.map((task: any) => ({
                ...task,
                entityTaskStatus: 'idle'
            }))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddToDoListAT, (state, action: PayloadAction<{ title: string, idToDoList: string }>) => {
            state[action.payload.idToDoList] = []
        })
        builder.addCase(GetToDoListsAT, (state, action: PayloadAction<{ ApiToDoLists: Array<TodolistType> }>) => {
            action.payload.ApiToDoLists.forEach((tl: { id: string | number; }) => {
                state[tl.id] = []
            })
        })
        builder.addCase(RemoveToDoListAT, (state, action: PayloadAction<{ toDoListID: string }>) => {
            delete state[action.payload.toDoListID]
        })
        builder.addCase(ClearToDoAT, (state, action) => {
            return {}
        })
    }
})

export const {getTasksAC, updateTaskAC, addTaskAC, changeEntityTaskStatusAC, removeTaskAC} = Slice.actions

export const taskReduser = Slice.reducer


//
// export const taskReduser = (state: TasksStateType = {}, action: any): TasksStateType => {
//     switch (action.type) {
//         case "REMOVE_TASK":
//             let copySate = {...state}
//             copySate[action.todolostId] = copySate[action.todolostId].filter(task => task.id !== action.taskId)
//             return copySate
//
//         case "GET-TASKS":
//             return {...state, [action.toDoListId]: action.obj.map((task: any) => ({...task, entityTaskStatus: 'idle'}))}
//         case "ADDTASK":
//             return {
//                 ...state,
//                 [action.task.todoListId]: [...state[action.task.todoListId], {...action.task, entityTaskStatus: 'idle'}]
//             }
//         case "CHANGE-ENTITY-TASK-STATUS":
//             return {
//                 ...state,
//                 [action.toDoListId]: state[action.toDoListId].map(task => task.id === action.taskId ?
//                     {...task, entityTaskStatus: action.entityTaskStatus} : task)
//             }
//         case "UPDATE_TASK":
//             return {
//                 ...state,
//                 [action.toDoListId]: state[action.toDoListId].map(ts => ts.id === action.taskId ? {...ts, ...action.model} : ts)
//             }
//
//         case "ADD-TODOLIST": {
//             return {
//                 ...state,
//                 [action.idToDoList]: []
//             }
//         }
//         case "GET-TODOLISTS": {
//             const stateCopy = {...state}
//             action.ApiToDoLists.forEach((tl: { id: string | number; }) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy
//
//         }
//         case "REMOVE-TODOLIST": {
//             let copyState = {...state};
//             delete copyState[action.toDoListID]
//             return copyState
//         }
//         default:
//             return state
//     }
// }
//
// export const removeTaskAC = (todolostId: string, taskId: string) => ({type: "REMOVE_TASK", todolostId, taskId} as const)
// export const addTaskAC = (task: TasksType) => ({type: "ADDTASK", task}) as const
// export const changeEntityTaskStatusAC = (toDoListId: string, taskId: string, entityTaskStatus: any) =>
//     ({
//         type: "CHANGE-ENTITY-TASK-STATUS",
//         toDoListId,
//         taskId,
//         entityTaskStatus
//     } as const)
// export const updateTaskAC = (toDoListId: string, taskId: string, model: UpdateTaskModelType) => ({
//     type: "UPDATE_TASK",
//     toDoListId,
//     taskId,
//     model
// } as const)
// export const getTasksAC = (toDoListId: string, obj: TasksType[]) => ({type: 'GET-TASKS', toDoListId, obj}) as const

export const fetchTasksThunkAT = (toDoListId: string) => (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTasks(toDoListId)
        .then(data => {
                dispatch(getTasksAC({toDoListId: toDoListId, obj: data.data.items}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}
export const removeTaskThunkAT = (toDoListId: string, taskId: string) => (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeEntityTaskStatusAC({toDoListId: toDoListId, taskId: taskId, entityTaskStatus: 'loading'}))
    todolistAPI.deleteTasks(toDoListId, taskId)
        .then(data => {
                dispatch(removeTaskAC({todolostId: toDoListId, taskId: taskId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                // dispatch(changeEntityTaskStatusAC({toDoListId: toDoListId, taskId: taskId, entityTaskStatus: 'succeeded'}))
            }
        )
}
export const addTaskThunkAT = (toDoListId: string, title: string) => (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.postTasks(toDoListId, title)
        .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(addTaskAC({task: data.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
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
) => (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
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
            entityTaskStatus: currentTask.entityTaskStatus,
            ...model
        }
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeEntityTaskStatusAC({toDoListId: toDoListId, taskId: taskId, entityTaskStatus: 'loading'}))
        todolistAPI.updateTasks(toDoListId, reqest, taskId)
            .then(data => {

                    if (data.data.resultCode === 0) {
                        dispatch(updateTaskAC({toDoListId: toDoListId, taskId: taskId, model: model}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(changeEntityTaskStatusAC({toDoListId, taskId, entityTaskStatus: 'succeeded'}))
                    } else {
                        handleServerAppError(data.data, dispatch)
                    }
                }
            )
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
    } else {
        console.warn('task not found in the state')
        return
    }
}

// export type changeEntityTaskStatusACType = ReturnType<typeof changeEntityTaskStatusAC>

// type ActionType =
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof getTasksAC>
//     | AddToDoListTypeAT
//     | RemoveToDoListTypeAT
//     | GetToDoListsTypeAT
//     // | setAppStatusACType
//     // | setAppErrorACType
//     | changeEntityTaskStatusACType

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