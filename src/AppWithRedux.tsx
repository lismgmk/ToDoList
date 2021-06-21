import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    AddToDoListAT, addTodolistsThunkAT,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT, deleteTodolistsThunkAT, fetchTodolistsThunkAT,
    GetToDoListsAT,
    RemoveToDoListAT, updateTodolistsThunkAT,
} from "./state/toDoListReduser";
import {TaskStatuses, TasksType, todolistAPI, TodolistType, UpdateTaskRequestType} from "./api/todolist-api";
import {
    addTaskThunkAT,
    chahgeTaskStatusThunkAT,
    chahgeTaskTitleThunkAT,
    fetchTasksThunkAT,
    removeTaskThunkAT, updateTaskThunkAT
} from "./state/taskReduser";
//
// export type tasksType = {
//     id: string
//     title: string
//     isDone: boolean
// }


export type FilterValuesType = "all" | "active" | "completed"

export type ToDoListType = {
    title: string
    id: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    //bll

    useEffect(() => {
            dispatch(fetchTodolistsThunkAT())
                },
        [])

    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists);
    let task = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();


    const addToDoList = useCallback((toDoListTitle: string) => {
        dispatch(addTodolistsThunkAT(toDoListTitle))
    }, [dispatch])

    const changeTitleTodoList = useCallback((title: string, toDoListId: string) =>
        dispatch(updateTodolistsThunkAT(title, toDoListId)) ,[])

    const deleteToDoList = useCallback((toDoListId: string)=>{
        dispatch(deleteTodolistsThunkAT(toDoListId))
    },[])

    const setFilterValue = useCallback((filter: FilterValuesType, toDoListId: string) => {
        dispatch(ChangeToDoListFilterAT(filter, toDoListId))
    } ,[])



    const addTask = useCallback(
        (title: string, toDoListId: string) =>
            dispatch(addTaskThunkAT( toDoListId, title))
        , [])

    const chahgeTaskTitle = useCallback(( toDoListId: string, taskId: string, newTitle : string) =>
        dispatch(updateTaskThunkAT(toDoListId, taskId, {title: newTitle})) , []) ;

    const chahgeTaskStatus = useCallback((toDoListId: string, taskId: string, status : TaskStatuses) =>
        dispatch(updateTaskThunkAT(toDoListId, taskId, {status})) , [])

    const removeTask = useCallback(
        (toDoListId: string, taskId: string) =>
            dispatch(removeTaskThunkAT( toDoListId, taskId))
        , [])








    const todoListComponents = toDoLists.map((tl) =>{
        let allToDoListTasks = task[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper key={tl.id} elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        key = {tl.id}
                        id = {tl.id}
                        title = {tl.title}
                        filter = {tl.filter}
                        allTask = {allToDoListTasks}
                        setFilter = {setFilterValue}
                        changeTitleTodoList = {changeTitleTodoList}
                        addTask = {addTask}
                        deleteToDoList = {deleteToDoList}
                        removeTask = {removeTask}
                        chahgeTaskTitle = {chahgeTaskTitle}
                        chahgeTaskStatus = {chahgeTaskStatus}

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


                    <AddItemForm  addItem={addToDoList}/>


                </Grid>

                <Grid container spacing={5}>


                    { todoListComponents }



                </Grid>

            </Container>

        </div>
    )
};


export default AppWithRedux;
