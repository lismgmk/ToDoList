import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2a543f27-0ac4-401a-8576-f27db5d5e11d'
    }
})

export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ActionToDoListType<D> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: D
}

export type ActionTaskType = {
    totalCount: number | null
    items: Array<TasksType>
    error: string
}

export type  TasksType = {
    description: string,
    title:string
    completed: number
    status: boolean
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type TasksPostTypeResp <D = {}>= {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: []
}

export type UpdateTaskRequestType = {
    title: string
    description: string
    status: boolean
    priority: number
    startDate: string
    deadline: string
    completed: number
}


export const todolistAPI = {

    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    postTodolist( title: string) {
        const promise = instance.post<ActionToDoListType<{ item: TodolistType }>>(`todo-lists`, {title: title})
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ActionToDoListType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ActionToDoListType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },


    getTasks(todolistId: string) {
        return instance.get<ActionTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    postTasks(todolistId: string, title: string) {
        const promise = instance.post<TasksPostTypeResp<{item : TasksType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },

    updateTasks(todolistId: string, request: UpdateTaskRequestType, taskId: string) {
        return instance.put<TasksPostTypeResp<TasksType>>(` /todo-lists/${todolistId}/tasks/${taskId}`, request)
    },
    deleteTasks(todolistId: string, taskId: string) {
        const promise = instance.delete<TasksPostTypeResp>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}


