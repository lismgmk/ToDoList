import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, mytasksType} from "./App";


 type TaskType = {
    id: string
    title: string
    isDone: boolean
};

 type  PropsType = {
     title: string
     task: Array<TaskType>
     changeToDoListFilter: (newFilterValue: FilterValuesType) => void
     removeTask: (taskID: string) => void
     addTask: (title:string) => void
     toDoListFilter: FilterValuesType
     changeTaskStatus: (value: string,newisDoneValue: boolean)=>void
 }

function TodoList(props: PropsType){


    const [error, setError] = useState<string|null>(null)
    const [title, setTitle] = useState<string>('')
    const task = props.task.map((i) => {
    const chahgeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(i.id, e.currentTarget.checked);
        return (
            <li>
                <input
                    type="checkbox"
                    checked={i.isDone}
                    onChange={chahgeStatus}
                />
                <span>{i.title}</span>
                <button
                    onClick={() => {
                        props.removeTask(i.id)
                    }}>
                    x
                </button>
            </li>
        )
    })

    const setAllFilterValue = ()=>{props.changeToDoListFilter('all')}
    const setActiveFilterValue = ()=>{props.changeToDoListFilter('active')}
    const setCompletedFilterValue = ()=>{props.changeToDoListFilter('completed')}
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(title)
            // setError(null)
        } else{
            setError('Ошибка ввода')

        }

        setTitle('')
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressAddTask = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }

    return(

            <div>
                <h3>{props.title}</h3>
                <div>

                    <input

                        value = {title}
                        onChange={changeTitle}
                        onKeyPress={onKeyPressAddTask}
                        className={error ? 'error': ''}
                    />
                    <button onClick={addTask}>+ </button>
                </div>
                <ul>
                    {task}
                </ul>
                <div>
                    <button
                        className= {props.toDoListFilter == 'all'? 'active-filter': ''}
                    onClick={setAllFilterValue}>
                        All
                    </button>
                    <button
                        className= {props.toDoListFilter == 'active'? 'active-filter': ''}
                        onClick={setActiveFilterValue}>
                        Active
                    </button>
                    <button
                        className= {props.toDoListFilter == 'completed'? 'active-filter': ''}
                        onClick={setCompletedFilterValue}>
                        Completed
                    </button>
                    {error && <div className={'error-text'}>{error}</div>}
                </div>
            </div>

    )
}

export default TodoList