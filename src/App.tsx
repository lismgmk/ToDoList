import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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

    const [newValue, setNewValue] = useState('')

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

    function changeTaskStatus(taskID: string, newisDoneValue: boolean){
        const updatedTasks = tasks.map((i)=>{
            if(i.id === taskID){
                return {...i, isDone: newisDoneValue}
            }
            return i
        } )
        setTasks(updatedTasks)
    }

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

    const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
        return setNewValue(e.currentTarget.value)
    }

    const addTask2 = (newTasks: string, cleanValue: (value: string)=> void)=>{
        const newTitle =  {id: v1(), title: newTasks, isDone: false};
        setTasks([...tasks, newTitle])
        cleanValue('')
    }

    // const onKeyPressAddTasks = (e: KeyboardEvent<HTMLInputElement>){
    //     if (e.key === 'Enter'){
    //         addTask2(newValue, ()=>setNewValue(''))
    //     }
    // }

    return (
        <div className="App">
            <TodoList
                title='What to learn'
                task={getTaskForToDoList()}
                changeToDoListFilter={changeToDoListFilter}
                removeTask={removeTask}
                addTask={addTask}
                toDoListFilter={toDoListFilter}
                changeTaskStatus={changeTaskStatus}
            />

         <MyToDoList
             title='Sport'
             tasks={myTasks}
             newValue={newValue}
             onChange={onChange}
             addTask2={addTask2}
             setNewValue={setNewValue}
             // onKeyPressAddTasks={onKeyPressAddTasks}

         />
        </div>
    )
};

export default App;
