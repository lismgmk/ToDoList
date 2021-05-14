import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import MyToDoList from "./myComponent/mytoDoList";
import {v1} from "uuid";
import {strict} from "assert";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReduser";
import {AddToDoListAT, ChangeToDoListFilterAT, ChangeToDoListTitleAT, RemoveToDoListAT} from "./state/toDoListReduser";

export type tasksType = {
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

export type ToDoListType = {
    title: string
    id: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<tasksType>
}

function AppWithRedux() {
    //bll
debugger

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    let toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists);
    const dispatch = useDispatch();



    const changeTaskStatus = useCallback((taskID: string, newisDoneValue: boolean, toDoListID: string)=>{
        dispatch(changeTaskStatusAC(taskID, newisDoneValue, toDoListID))

    } ,[])
    const changeTaskTitle = useCallback((taskID: string, title: string, toDoListID: string)=>{
        dispatch(changeTaskTitleAC(taskID, title, toDoListID))

    } ,[])
    const removeTask = useCallback((taskId: string, toDoListID: string)=> {

        dispatch(removeTaskAC(taskId, toDoListID))
    } ,[])
    const addTask = useCallback((title: string, toDoListID: string)=> {

        dispatch(addTaskAC(title, toDoListID))
    } ,[])

    const removeToDoList = useCallback( (toDoListID: string)=> {

        dispatch(RemoveToDoListAT(toDoListID))
        delete  tasks[toDoListID]
    } ,[])

    const changeToDoListFilter = useCallback((newFiltervalue: FilterValuesType, toDoListID: string)=> {

        dispatch(ChangeToDoListFilterAT(newFiltervalue, toDoListID))
    } ,[])
    const addToDoList = useCallback((title: string) => {
        debugger
        const action = AddToDoListAT(title)
        dispatch(action)
    }, [])
    const getTaskForToDoList = useCallback((toDoList: ToDoListType): Array<tasksType>=> {
        debugger
        switch (toDoList.filter) {
            case "active":
                return tasks[toDoList.id].filter( i => i.isDone === false)
            case "completed":
                return tasks[toDoList.id].filter(i => i.isDone === true)
            default:
                return tasks[toDoList.id]
        }
    } ,[])
    const changeToDoListTitle = useCallback((title: string, toDoListID: string)=>{
        dispatch(ChangeToDoListTitleAT(title, toDoListID))
    } ,[])



    const todoListComponents = toDoLists.map((tl) =>{
        debugger
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        removeToDoList={removeToDoList}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}

                        tasks={tasks}


                        changeToDoListFilter={changeToDoListFilter}
                        removeTask={removeTask}

                        addTask={addTask}

                        toDoListFilter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoListTitle={changeToDoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>


                    <AddItemForm addItem={addToDoList}/>


                </Grid>

                <Grid container spacing={5}>


                    { todoListComponents }



                </Grid>

            </Container>

        </div>
    )
};


export default AppWithRedux;
