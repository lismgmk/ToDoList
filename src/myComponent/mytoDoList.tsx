import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import {mytasksType} from "../App";

type propsType = {
    title: string
    tasks: Array<mytasksType>
    newValue: string
    onChange:(value: ChangeEvent<HTMLInputElement>)=>void
    addTask2:(value: string, value2: (value: string)=> void)=> void
    setNewValue: (value: string)=> void
    // onKeyPressAddTasks: (value: KeyboardEvent<HTMLInputElement>)=>void
}

const MyToDoList = (props: propsType) => {
    //
    // //Отслеживание удалений
    const [tasks, setTasks] = useState(props.tasks);
    const [selector, setSelector] = useState<string>("All");


    const rerenderSetSelector = (filter: string) => {
        if(filter === 'Active') setSelector('Active')
        else if (filter === 'Completed') setSelector("Completed")
        else setSelector('All')
    }


    function getTaskForToDoList (selector: string, tasks: Array<any>) {
        switch (selector) {
            case "Active":
                return tasks.filter( i => i.isDone === false)
            case "Completed":
                return tasks.filter(i => i.isDone === true)
            default:
                return tasks
        }
    };

    const deleteTaskById = (id: string) => setTasks(tasks.filter(task => task.id !== id))

    const tasksElements = getTaskForToDoList(selector, tasks).map((i) => {

        return (

                <li>
                    <input type="checkbox" checked={i.isDone} />
                    <span>{i.title}</span>
                    <button
                        onClick={() => {
                            deleteTaskById(i.id)
                        }}>
                        x
                    </button>
                </li>


        )
    })




    return (
        <div>
            <h1>{props.title}</h1>

            <input
                value={props.newValue}
                onChange = {props.onChange}
                />
                <button
                    onClick={()=>props.addTask2(props.newValue, ()=>props.setNewValue(''))}
                    // onKeyPress={(e)=>props.onKeyPressAddTasks}
                >+</button>

            {
                tasksElements
            }

            <button onClick={ () =>rerenderSetSelector('All')}>All</button>
            <button onClick={() => rerenderSetSelector('Active')}>Active</button>
            <button onClick={() => rerenderSetSelector('Completed')}>Completed</button>
        </div>
    )
};

export default MyToDoList;