import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import MyToDoList from "./myComponent/mytoDoList";
import {v1} from "uuid";


type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type mytasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"





function App() {
    console.log(v1());
    const myTasks : Array<mytasksType>= [
        {id: v1(), title: "Run", isDone: false},
        {id: v1(), title: "Football", isDone: true},
        {id: v1(), title: "REACTJS", isDone: false},
    ];



    const [tasks, setTasks] = useState<Array<tasksType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACTJS", isDone: false},
        ]
    );

    function removeTask (taskId: string) {
       setTasks(tasks.filter(i => i.id !== taskId))
    }

    function addTask(title: string) {
        const task: tasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [task, ...tasks];
        setTasks(newTasks);

    }

    const [toDoListFilter, setToDoListFilter] = useState<FilterValuesType>('all');


    function changeToDoListFilter(i: FilterValuesType) {
        setToDoListFilter(i);
    }


    function getTaskForToDoList () {
        switch (toDoListFilter) {
            case "active":
                return tasks.filter( i => i.isDone === false)
            case "completed":
                return tasks.filter(i => i.isDone === true)
            default:
                return tasks
        }
    };


    return (
        <div className="App">
            <TodoList
                title='What to learn'
                task={getTaskForToDoList()}
                changeToDoListFilter={changeToDoListFilter}
                removeTask={removeTask}
                addTask={addTask}
            />

         <MyToDoList title='Sport' tasks={myTasks}/>
        </div>
    )
};

export default App;
