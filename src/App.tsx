import React from 'react';
import './App.css';
import TodoList from "./TodoList";


function App() {

    const task1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACTJS", isDone: false},
    ];

    const task2 = [
        {id: 1, title: "Hello World", isDone: true},
        {id: 2, title: "I am a happy", isDone: false},
        {id: 3, title: "yo", isDone: false},
    ];



    return (
        <div className="App">
            <TodoList title='What to learn' task ={task1} />
            <TodoList title='Songs' task={task2} />

        </div>
    );
}

export default App;
