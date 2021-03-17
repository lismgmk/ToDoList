import React, {useState} from "react";

import {mytasksType} from "../App";

type propsType = {
    title: string
    tasks: Array<mytasksType>
}

const MyToDoList = (props: propsType) => {
    //
    // //Отслеживание удалений
    const [tasks, setTasks] = useState(props.tasks);
    const [selector, setSelector] = useState<string>("All");
    // //Функия удаления по clean
    // function removeItem(selectorId: string) {
    //     return (
    //         props.tasks.filter(i => i.id !== selectorId)
    //     )
    // }
    // // Перерисовка
    // const renderMyToDoList = clean.map((i, index) => {
    //     return (
    //         <li key={index}>
    //             <input type="checkbox" checked={i.isDone}/>
    //             <span>{i.title}</span>
    //             <button onClick={() =>{ setClean(removeItem(i.id))}}>
    //                 x
    //             </button>
    //         </li>
    //     )
    // });
    //
    // //Отслеживание фильтрации
    // const [selector, setSelector] = useState<string>("All");
    // //Засовываем в setSelector новое значение
    // const rerenderSetSelector = (i : string) => {
    //     setSelector(i)
    // }
    // //Функция фильтрации по selector
    // const filterFunc = () => {
    //     switch (selector) {
    //         case "Active":
    //             return (
    //                 props.tasks.filter((i) => i.isDone === true)
    //             )
    //         case "Completed":
    //             return (
    //                 props.tasks.filter((i) => i.isDone === false)
    //             )
    //         default:
    //             return props.tasks
    //     }
    // }
    // //Перерисовка
    // const renderMyToDoList2 = filterFunc().map((i, index) => {
    //     return (
    //         <li key={index}>
    //             <input type="checkbox" checked={i.isDone}/>
    //             <span>{i.title}</span>
    //             <button onClick={() =>{ setClean(removeItem(i.id))}}>
    //                 x
    //             </button>
    //         </li>
    //     )
    // });

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