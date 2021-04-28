import {FilterValuesType, TasksStateType, ToDoListType} from "../App";
import {v1} from "uuid";
import {strict} from "assert";
import {AddToDoListAT} from "./toDoListReduser";

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
   taskId: number
    todolistId: string
    taskStatus: boolean

}



type ActionType = RemoveTaskActionType | ChangeTaskStatusType |
    AddTaskType | AddToDoListAT

export const taskReduser = (state: TasksStateType, action: ActionType) : TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            let copySate = {...state}
            copySate[action.todolostId] = copySate[action.todolostId].filter(task => task.id !== action.taskId)
           return  copySate
        case "ADDTASK":
            const newTasks = {
                id: v1(),
                title: action.title,
                isDone: false
            }

           return  { ...state,
               [action.todolostId]: [newTasks, ...state[action.todolostId]] }
        case "CHANGE_TASK_STATUS":
            let copyState = {...state}
            let updateTask = copyState[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.taskStatus}
                    } else {
                        return task
                    }
                }
            )
            return {
                ...state,
                [action.todolistId]: updateTask
            }

        case "ADD-TODOLIST": {
            return {...state, [v1()]: []}
        }
        case "REMOVE-TODOLIST": {
            return {...state, [v1()]: []}
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


export const changeTaskStatusAC = (taskId: number, taskStatus: boolean, todolistId: string ): ChangeTaskStatusType => {
    return {type: "CHANGE_TASK_STATUS", taskId,  taskStatus, todolistId}
}

