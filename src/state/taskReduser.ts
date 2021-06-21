import {FilterValuesType, TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {strict} from "assert";
import {AddToDoListTypeAT, RemoveToDoListTypeAT, GetToDoListsTypeAT} from "./toDoListReduser";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TasksType, todolistAPI, UpdateTaskRequestType} from "../api/todolist-api";
import {AppRootStateType} from "../store";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof getTasksAC>
    | AddToDoListTypeAT
    | RemoveToDoListTypeAT
    | GetToDoListsTypeAT

export const taskReduser = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            let copySate = {...state}
            copySate[action.todolostId] = copySate[action.todolostId].filter(task => task.id !== action.taskId)
            return copySate


        case "GET-TASKS":
            let copyStat = {...state}
            copyStat[action.toDoListId] = action.obj.map((task) => {
                return {...task, isDone: true}
            })
            return copyStat

        case "ADDTASK":
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId], {
                    ...action.task,
                    completed: false,
                    title: action.task.title
                }]
            }

        case "UPDATE_TASK":
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(ts => ts.id === action.taskId ? {...ts, ...action.model} : ts)
            }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.newTitle}
                    } else {
                        return task
                    }
                })
            }

        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.toDoList.id]: []
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



export const removeTaskAC = (todolostId: string, taskId: string) => ({type: "REMOVE_TASK", todolostId, taskId}as const)
export const addTaskAC = (task: TasksType) => ({type: "ADDTASK", task}) as const

export const updateTaskAC = (toDoListId: string, taskId: string, model: UpdateTaskModelType) => ({type: "UPDATE_TASK", toDoListId, taskId, model}as const)

export const changeTaskTitleAC = (taskId: string, newTitle: string, toDoListId: string) => ({type: 'CHANGE_TASK_TITLE', taskId, newTitle, toDoListId}as const)
export const getTasksAC = (toDoListId: string, obj: TasksType[]) => ({type: 'GET-TASKS', toDoListId, obj})  as const

export const fetchTasksThunkAT = (toDoListId: string) =>  (dispatch: Dispatch<ActionType>) => {
        todolistAPI.getTasks(toDoListId)
            .then(data =>
                dispatch(getTasksAC(toDoListId, data.data.items))
            )
    }
export const removeTaskThunkAT = (toDoListId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTasks(toDoListId, taskId)
        .then(data => {
                return (dispatch(removeTaskAC(toDoListId, taskId)))
            }
        )
}
export const addTaskThunkAT = (toDoListId: string, title: string) =>  (dispatch: Dispatch<ActionType>) => {
        todolistAPI.postTasks(toDoListId, title)
            .then(data => {
                return (dispatch(addTaskAC(data.data.data.item)))
                }
            )
    }

type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    completed?: boolean
}

export const updateTaskThunkAT  = (toDoListId: string, taskId: string, model: UpdateTaskModelType) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        let state = getState().tasks
        let currentToDoList = state[toDoListId]
        let currentTask = currentToDoList.find(task => {return (task.id === taskId)})
        if (currentTask) {

            todolistAPI.updateTasks(toDoListId, {
                title: currentTask.title,
                description: currentTask.description,
                status: currentTask.status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                completed: currentTask.completed,
                ...model
            }, taskId)
                .then(data => {
                    debugger
                        return (dispatch(updateTaskAC(toDoListId, taskId, model)))
                    }
                )
        }
    }



