import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


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
 }

function TodoList(props: PropsType){

    const [title, setTitle] = useState<string>('')
    const task = props.task.map((i) => {

        return (
            <li>
                <input type="checkbox" checked={i.isDone} />
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
        props.addTask(title)
        setTitle('')
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
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
                    />
                    <button onClick={addTask}>+ </button>
                </div>
                <ul>
                    {task}
                </ul>
                <div>
                    <button
                    onClick={setAllFilterValue}>
                        All
                    </button>
                    <button
                        onClick={setActiveFilterValue}>
                        Active
                    </button>
                    <button
                        onClick={setCompletedFilterValue}>
                        Completed
                    </button>
                </div>
            </div>

    )
}

export default TodoList