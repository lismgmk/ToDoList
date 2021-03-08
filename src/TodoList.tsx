import React from "react";
import {FilterValuesType} from "./App";

 type TaskType = {
    id: number
    title: string
    isDone: boolean
};

 type  PropsType = {
     title: string
     task: Array<TaskType>
     changeToDoListFilter: (newFilterValue: FilterValuesType) => void
     removeTask: (taskID: number) => void
 }

function TodoList(props: PropsType){

const task = props.task.map((i) => {

    return(
        <li>
            <input type="checkbox" checked={i.isDone}/>
            <span>{i.title}</span>
            <button
                onClick = {()=>{props.removeTask(i.id)}}>
                x</button>
        </li>
    )
})


    return(
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+ </button>
                </div>
                <ul>
                    {task}
                </ul>
                <div>
                    <button
                    onClick={()=>{
                        props.changeToDoListFilter('all')
                    }}>
                        All
                    </button>
                    <button
                        onClick={()=>{
                            props.changeToDoListFilter('active')
                        }}>
                        Active
                    </button>
                    <button
                        onClick={()=>{
                            props.changeToDoListFilter('completed')
                        }}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoList