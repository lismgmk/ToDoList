import axios from 'axios'
import {TasksPostTypeResp} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'a40d8e19-8ad7-4404-b77e-7dea185478ff'
    }
})


export type initialazedDataType = {
    id: number
    email: string
    login: string
}

export const initialazedAPI = {

    isLoged() {
        return instance.get<TasksPostTypeResp <initialazedDataType>>(`/auth/me`)
    },
    logOut() {
        return instance.delete<TasksPostTypeResp >(`/auth/login`)
    }
}

