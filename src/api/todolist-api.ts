import axios from 'axios'
import {UpdateTaskModelType} from "../features/todoListsList/taskReduser";
import {modelLoginStateType} from "../features/login/loginReduser";
import {number} from "yup";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'a40d8e19-8ad7-4404-b77e-7dea185478ff'
    }
})

export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

// type ActionToDoListType<D> = {
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: D
// }
export type TasksPostTypeResp <D = {}>= {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: []
}

export type ActionTaskType = {
    totalCount: number | null
    items: Array<TasksType>
    error: string
}

export type  TasksType = {
    id: string
    title:string
    description: string,
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    deadline: string
    todoListId: string
    order: number
    addedDate: string
    startDate: string
}


export type UpdateTaskRequestType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
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


export const todolistAPI = {

    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    postTodolist( title: string) {
        const promise = instance.post<TasksPostTypeResp<{ item: TodolistType }>>(`todo-lists`, {title: title})
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TasksPostTypeResp<{}>>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<TasksPostTypeResp<{}>>(`todo-lists/${todolistId}`)
        return promise
    },

    getTasks(todolistId: string) {
        return instance.get<ActionTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    postTasks(todolistId: string, title: string) {
        const promise = instance.post<TasksPostTypeResp<{item : TasksType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },

    updateTasks(todolistId: string, request: UpdateTaskModelType, taskId: string) {
        return instance.put<TasksPostTypeResp<TasksType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, request).then(res => {
                console.log(res)
                return res
            })
    },
    deleteTasks(todolistId: string, taskId: string) {
        const promise = instance.delete<TasksPostTypeResp>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    fetchForm(model: modelLoginStateType) {
        return instance.post<TasksPostTypeResp<{userId: number}>>(`/auth/login`, model)
    }
}


