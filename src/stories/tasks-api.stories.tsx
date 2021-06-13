import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import axios from "axios";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '58eb4fa7-86ae-4b56-89c9-8cd47c5ebf67';
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {

                setState(res.data);
            })
            }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '07111a8a-4a62-4c9b-b94c-a4035c493bc6';
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
        const todolistId = '07111a8a-4a62-4c9b-b94c-a4035c493bc6'
        const taskId = '5b7611df-78e0-4e34-a43f-bb2ff202ce4b'


        const request = {
            title: 'New',
            description: 'study',
            completed: 1,
            status: false,
            priority: 1,
            startDate: '01/01/2019',
            deadline: '01/09/2021'
        };

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


