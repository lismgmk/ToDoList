import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";


export default {
    title: 'API'
}
const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                debugger
                setState(res.data);
            })
            }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.postTodolist("newTodolist2")
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a0da33f1-b8f1-4aec-a19a-31b48bbacde6';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })



    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '84d1e3fa-ec9d-4dc6-bbad-e9837bd894b4'

        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })



    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a0da33f1-b8f1-4aec-a19a-31b48bbacde6';
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                debugger
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
