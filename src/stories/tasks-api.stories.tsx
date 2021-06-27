import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import axios from "axios";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '65ab328d-5253-4b7e-a075-ac55334e2d97';
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {

                setState(res.data.items);
            })
            }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '84d1e3fa-ec9d-4dc6-bbad-e9837bd894b4';
    const title = "else posts!!"
    useEffect(() => {
        todolistAPI.postTasks(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
            }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '84d1e3fa-ec9d-4dc6-bbad-e9837bd894b4'
        const taskId = '9bcbabe5-9859-4dde-93ba-1332a52a5547'


        const request = {
            title: 'New'
        }

        todolistAPI.updateTasks(todolistId, request, taskId)
            .then((res) => {
                setState(res.data.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '07111a8a-4a62-4c9b-b94c-a4035c493bc6'
        const taskId = '026f6166-8981-4426-ba06-0e7d72a04321'
        todolistAPI.deleteTasks(todolistId, taskId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


