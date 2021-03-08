import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

type tasksType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {



    const [tasks, setTasks] = useState<Array<tasksType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "REACTJS", isDone: false},
        ]
    );

    function removeTask (taskId: number) {
       setTasks(tasks.filter(i => i.id !== taskId))
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
               task = {getTaskForToDoList()}
                changeToDoListFilter={changeToDoListFilter}
                removeTask ={removeTask}
            />


        </div>
    );
}

export default App;
