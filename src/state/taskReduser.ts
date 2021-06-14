import {FilterValuesType, TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {strict} from "assert";
import {AddToDoListAT, RemoveToDoListAT, GetToDoListsAT, GetToDoListTypeAT} from "./toDoListReduser";
import {Dispatch} from "redux";
import {TasksType, todolistAPI, UpdateTaskRequestType} from "../api/todolist-api";
import {AppRootStateType} from "../store";


type GetTasksType = {
    type: 'GET-TASKS'
    toDoListId: string
    obj: TasksType[]
}


type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todolostId: string
}

export type AddTaskType = {
    type: "ADDTASK"
    task: TasksType
}

export type ChangeTaskStatusType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    newisDoneValue: boolean
    toDoListId: string
}

export type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    newTitle: string
    toDoListId: string
}

type ActionType = RemoveTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType |
    AddTaskType | AddToDoListAT | RemoveToDoListAT | GetToDoListTypeAT | GetTasksType

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

        case "CHANGE_TASK_STATUS":
            let copyState = {...state}
            let updateTask = copyState[action.toDoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, completed: action.newisDoneValue}
                    } else {
                        return task
                    }
                }
            )
            return {
                ...state,
                [action.toDoListId]: updateTask
            }
        case "CHANGE_TASK_TITLE": {
            let copyState = {...state}

            let updTaskTitle = copyState[action.toDoListId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, title: action.newTitle}
                } else {
                    return task
                }
            })

            return {
                ...state,
                [action.toDoListId]: updTaskTitle
            }

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

export const removeTaskAC = (todolostId: string, taskId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", todolostId, taskId}
}
export const addTaskAC = (task: TasksType): AddTaskType => {
    return {type: "ADDTASK", task} as const
}
export const changeTaskStatusAC = (taskId: string, newisDoneValue: boolean, toDoListId: string): ChangeTaskStatusType => {
    return {type: "CHANGE_TASK_STATUS", taskId, newisDoneValue, toDoListId}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, toDoListId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, newTitle, toDoListId}
}
export const getTasksAC = (toDoListId: string, obj: TasksType[]): GetTasksType => {
    return {type: 'GET-TASKS', toDoListId, obj}
}

export const fetchTasksThunkAT = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(toDoListId)
            .then(data =>
                dispatch(getTasksAC(toDoListId, data.data.items))
            )
    }
}


export const removeTaskThunkAT = (toDoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {

        todolistAPI.deleteTasks(toDoListId, taskId)
            .then(data => {
                    debugger
                    return (dispatch(removeTaskAC(toDoListId, taskId)))
                }
            )

    }
}


export const addTaskThunkAT = (toDoListId: string, title: string) => {
    return (dispatch: Dispatch) => {

        todolistAPI.postTasks(toDoListId, title)
            .then(data => {
                return (dispatch(addTaskAC(data.data.data.item)))
                }
            )

    }
}
export const chahgeTaskStatusThunkAT = (taskId: string, newisDoneValue: boolean, toDoListId: string) => {
    debugger
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
                completed: newisDoneValue
            }, taskId)
                .then(data => {
                    debugger
                        return (dispatch(changeTaskStatusAC(taskId, newisDoneValue, toDoListId) ) )
                    }
                )
        }
    }
}

export const chahgeTaskTitleThunkAT = (taskId: string, newTitle:string, toDoListId: string) => {
    debugger
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        let state = getState().tasks
        let currentToDoList = state[toDoListId]
        let currentTask = currentToDoList.find(task => {return (task.id === taskId)})
        if (currentTask) {

            todolistAPI.updateTasks(toDoListId, {
                title: newTitle,
                description: currentTask.description,
                status: currentTask.status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                completed: currentTask.completed
            }, taskId)
                .then(data => {
                    debugger
                        return (dispatch(changeTaskTitleAC(taskId, newTitle, toDoListId) ) )
                    }
                )
        }
    }
}

