import {FilterValuesType, TasksStateType, tasksType, ToDoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {strict} from "assert";
import {AddToDoListAT, RemoveToDoListAT, GetToDoListsAT, GetToDoListTypeAT} from "./toDoListReduser";
import {Dispatch} from "redux";
import {TasksType, todolistAPI} from "../api/todolist-api";


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
    title: string
    todolostId: string
}

export type ChangeTaskStatusType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    newisDoneValue: boolean
    toDoListID: string
}

export type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    newTitle: string
    toDoListId: string
}

type ActionType = RemoveTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType |
    AddTaskType | AddToDoListAT | RemoveToDoListAT | GetToDoListTypeAT | GetTasksType

export const taskReduser = (state: TasksStateType={}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            let copySate = {...state}
            copySate[action.todolostId] = copySate[action.todolostId].filter(task => task.id !== action.taskId)
            return copySate


        case "GET-TASKS":
            let copyStat = {...state}
            copyStat[action.toDoListId] = action.obj.map((task) => { return {...task, isDone: true}})
            return copyStat

        case "ADDTASK":

            const newTasks = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolostId]: [newTasks, ...state[action.todolostId]]
            }
        case "CHANGE_TASK_STATUS":
            let copyState = {...state}
            let updateTask = copyState[action.toDoListID].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.newisDoneValue}
                    } else {
                        return task
                    }
                }
            )
            return {
                ...state,
                [action.toDoListID]: updateTask
            }
        case "CHANGE_TASK_TITLE": {
            let copyState = {...state}

                let updTaskTitle =  copyState[action.toDoListId].map(task => {
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

            return {...state,
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

export const removeTaskAC = (taskId: string, todolostId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todolostId}
}

export const addTaskAC = (title: string, todolostId: string): AddTaskType => {
    return {type: "ADDTASK", title, todolostId}
}

export const changeTaskStatusAC = (taskId: string, newisDoneValue: boolean, toDoListID: string): ChangeTaskStatusType => {
    return {type: "CHANGE_TASK_STATUS", taskId, newisDoneValue, toDoListID}
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, toDoListId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, newTitle, toDoListId}
}

export const getTasksAC = (toDoListId: string, obj: TasksType[]): GetTasksType => {
    return {type: 'GET-TASKS', toDoListId, obj}
}


export const fetchTasksThunkAT = (toDoListId: string) => {
    return (dispatch: Dispatch)=>{
        todolistAPI.getTasks(toDoListId)
            .then(data =>
                dispatch(getTasksAC(toDoListId, data.data.items))
            )
    }
}