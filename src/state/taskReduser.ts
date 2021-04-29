import {FilterValuesType, TasksStateType, ToDoListType} from "../App";
import {v1} from "uuid";
import {strict} from "assert";
import {AddToDoListAT, RemoveToDoListAT} from "./toDoListReduser";

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
    AddTaskType | AddToDoListAT | RemoveToDoListAT

export const taskReduser = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            let copySate = {...state}
            copySate[action.todolostId] = copySate[action.todolostId].filter(task => task.id !== action.taskId)
            return copySate
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

