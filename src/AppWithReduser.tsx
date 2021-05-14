import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import '../../src/App.css';
// import TodoList from "../../src/TodoList";
// import MyToDoList from "../../src/myComponent/mytoDoList";
// import {v1} from "uuid";
// import {strict} from "assert";
// import AddItemForm from "../../src/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     AddToDoListAT,
//     ChangeToDoListFilterAT,
//     ChangeToDoListTitleAT,
//     RemoveToDoListAT,
//     toDoListReduser
// } from "../../src/state/toDoListReduser";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReduser} from "../../src/state/taskReduser";

//
// type tasksType = {
//     id: string
//     title: string
//     isDone: boolean
// }
// export type mytasksType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type FilterValuesType = "all" | "active" | "completed"
//
// export type ToDoListType = {
//     title: string
//     id: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<tasksType>
// }

function AppWithReduser() {
    //bll
    // const [newValue, setNewValue] = useState('')
    // const toDoListID_1 = v1()
    // const toDoListID_2 = v1()
    //
    // let [toDoLists, dispatchToToDoList] = useReducer(toDoListReduser, [
    //     {id: toDoListID_1, title: "What to learn", filter: 'all'},
    //     {id: toDoListID_2, title: "What to bye", filter: 'all'}
    // ])
    //
    //
    // let [tasks, dispatchToTask] = useReducer(taskReduser, {
    //     [toDoListID_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "REACTJS", isDone: false}
    //     ],
    //     [toDoListID_2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Water", isDone: false}
    //     ]
    // })
    //
    // function changeTaskStatus(taskID: string, newisDoneValue: boolean, toDoListID: string){
    //     dispatchToTask(changeTaskStatusAC(taskID, newisDoneValue, toDoListID))
    //     // const updatedTasks = tasks[toDoListID].map((i)=>{
    //     //     if(i.id === taskID){
    //     //         return {...i, isDone: newisDoneValue}
    //     //     }
    //     //     return i
    //     // } )
    //     // setTasks({...tasks, [toDoListID]: updatedTasks})
    // }
    // function changeTaskTitle(taskID: string, title: string, toDoListID: string){
    //     dispatchToTask(changeTaskTitleAC(taskID, title, toDoListID))
    //     // debugger
    //     // const updatedTasks = tasks[toDoListID].map((i)=>{
    //     //     if(i.id === taskID){
    //     //         return {...i, title: title}
    //     //     }
    //     //     return i
    //     // } )
    //     // setTasks({...tasks, [toDoListID]: updatedTasks})
    // }
    // function removeTask(taskId: string, toDoListID: string) {
    //     // const updatedTasks = tasks[toDoListID].filter(i => i.id !== taskId);
    //     // setTasks({
    //     //     ...tasks,
    //     //     [toDoListID]: updatedTasks
    //     // })
    //     dispatchToTask(removeTaskAC(taskId, toDoListID))
    // }
    // function addTask(title: string, toDoListID: string) {
    //     // const newTasks = {
    //     //     id: v1(),
    //     //     title,
    //     //     isDone: false
    //     // }
    //     //
    //     // const upDatedTasks = [newTasks, ...tasks[toDoListID]]
    //     // setTasks({...tasks, [toDoListID]: upDatedTasks})
    //     dispatchToTask(addTaskAC(title, toDoListID))
    // }
    //
    // function removeToDoList (toDoListID: string) {
    //     // const updatedToDoLists = toDoLists.filter(i => i.id !== toDoListID);
    //     // setToDoLists(updatedToDoLists)
    //     // delete  tasks[toDoListID]
    //     dispatchToToDoList(RemoveToDoListAT(toDoListID))
    //     delete  tasks[toDoListID]
    // }
    //
    // function changeToDoListFilter(newFiltervalue: FilterValuesType, toDoListID: string) {
    //     // const updatedToDoLists = toDoLists.map(i => i.id === toDoListID ? {...i, filter: newFiltervalue}: i);
    //     // setToDoLists(updatedToDoLists)
    //     dispatchToToDoList(ChangeToDoListFilterAT(newFiltervalue, toDoListID))
    // }
    // function addToDoList (title: string) {
    //     const action = AddToDoListAT(title)
    //     dispatchToToDoList(action)
    //     dispatchToTask(action)
    // }
    // function getTaskForToDoList (toDoList: ToDoListType): Array<tasksType> {
    //     switch (toDoList.filter) {
    //         case "active":
    //             return tasks[toDoList.id].filter( i => i.isDone === false)
    //         case "completed":
    //             return tasks[toDoList.id].filter(i => i.isDone === true)
    //         default:
    //             return tasks[toDoList.id]
    //     }
    // };
    // function changeToDoListTitle(title: string, toDoListID: string){
    //     dispatchToToDoList(ChangeToDoListTitleAT(title, toDoListID))
    // }
    //
    //
    //
    // const todoListComponents = toDoLists.map((tl) =>{
    //     return (
    //         <Grid item key={tl.id}>
    //             <Paper elevation={6} style={{padding: '20px'}}>
    //                 <TodoList
    //                     removeToDoList={removeToDoList}
    //                     key={tl.id}
    //                     id={tl.id}
    //                     title={tl.title}
    //                     task={getTaskForToDoList(tl)}
    //                     changeToDoListFilter={changeToDoListFilter}
    //                     removeTask={removeTask}
    //                     addTask={addTask}
    //                     toDoListFilter={tl.filter}
    //                     changeTaskStatus={changeTaskStatus}
    //                     changeTaskTitle={changeTaskTitle}
    //                     changeToDoListTitle={changeToDoListTitle}
    //                 />
    //             </Paper>
    //         </Grid>
    //     )
    // })

    return (
        <div className="App">
            {/*<AppBar position="static">*/}
            {/*    <Toolbar style={{justifyContent: 'space-between'}}>*/}
            {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
            {/*            <Menu/>*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6">*/}
            {/*            TodoLists*/}
            {/*        </Typography>*/}
            {/*        <Button variant={'outlined'} color="inherit">Login</Button>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            {/*<Container fixed>*/}
            {/*    <Grid container style={{padding: "20px 0px"}}>*/}
            {/*        <AddItemForm addItem={addToDoList}/>*/}
            {/*    </Grid>*/}

            {/*   <Grid container spacing={5}>*/}
            {/*       { todoListComponents }*/}
            {/*   </Grid>*/}

            {/*</Container>*/}

        </div>
    )
};

export default AppWithReduser;
