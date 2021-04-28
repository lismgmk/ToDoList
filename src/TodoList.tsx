import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, mytasksType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";


 type TaskType = {
    id: string
    title: string
    isDone: boolean
};

 type  PropsType = {
     removeToDoList: (i : string) => void
     id: string
     title: string
     task: Array<TaskType>
     changeToDoListFilter: (newFilterValue: FilterValuesType, toDoListID: string) => void
     removeTask: (taskID: string, toDoListID: string) => void
     addTask: (title:string, toDoListID: string) => void
     toDoListFilter: FilterValuesType
     changeTaskStatus: (value: string, newisDoneValue: boolean, toDoListID: string)=>void
     changeTaskTitle: (taskID: string, title: string, toDoListID: string)=> void
     changeToDoListTitle: (title: string, toDoListID: string)=> void
 }

function TodoList(props: PropsType){

    //
    // const [error, setError] = useState<string|null>(null)
    // const [title, setTitle] = useState<string>('')
    const task = props.task.map((i) => {
    const chahgeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(i.id, e.currentTarget.checked, props.id);
    const changeTaskTitle = (title: string)=>{
        props.changeTaskTitle(i.id, title, props.id)
    }
        return (
            <li >

                <Checkbox
                    color={'primary'}
                    onChange={chahgeStatus}
                    checked={i.isDone}
                />

                <EditableSpan
                    title={i.title}
                    changeTitle={changeTaskTitle}
                />
                <IconButton onClick={() => {
                    props.removeTask(i.id, props.id)
                }}>
                    <Delete/>
                </IconButton>

            </li>
        )
    })

    const setAllFilterValue = ()=>{props.changeToDoListFilter('all', props.id)}
    const setActiveFilterValue = ()=>{props.changeToDoListFilter('active', props.id)}
    const setCompletedFilterValue = ()=>{props.changeToDoListFilter('completed', props.id)}

    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

const changeTodoListTitle = (title: string)=>props.changeToDoListTitle(title, props.id)
    const addTask = (title: string) => props.addTask(title, props.id)

    return(

        <div>
            <h3>

                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeToDoList}>X</button>*/}


            </h3>
           <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {task}
            </ul>
            <div>
                <Button
                    size={"small"}

                    variant={props.toDoListFilter == 'all' ? 'outlined' : 'contained'}
                    // className={props.toDoListFilter == 'all' ? 'active-filter' : ''}
                    onClick={setAllFilterValue}>
                    All
                </Button>
                <Button
                    size={"small"}
                    variant={props.toDoListFilter == 'active' ? 'outlined' : 'contained'}
                    // className={props.toDoListFilter == 'active' ? 'active-filter' : '}
                    onClick={setActiveFilterValue}>
                    Active
                </Button>
                <Button

                    size={"small"}
                    variant={props.toDoListFilter == 'completed' ? 'outlined' : 'contained'}
                    // className={props.toDoListFilter == 'completed' ? 'active-filter' : ''}
                    onClick={setCompletedFilterValue}>
                    Completed
                </Button>

            </div>
        </div>

    )
}

export default TodoList