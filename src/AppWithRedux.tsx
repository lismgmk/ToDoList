import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    AddToDoListAT,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT, fetchTodolistsThunkAT,
    GetToDoListsAT,
    RemoveToDoListAT,
} from "./state/toDoListReduser";
import {todolistAPI, TodolistType} from "./api/todolist-api";
import {fetchTasksThunkAT} from "./state/taskReduser";

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

    useEffect(() => {
            dispatch(fetchTodolistsThunkAT())
            dispatch(fetchTasksThunkAT('07111a8a-4a62-4c9b-b94c-a4035c493bc6'))

        },
        [])

    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists);
    const dispatch = useDispatch();
    const addToDoList = useCallback((toDoListTitle: string) => {
        dispatch(AddToDoListAT(toDoListTitle))
    }, [])

    const todoListComponents = toDoLists.map((tl) =>{

        return (
            <Grid item key={tl.id}>
                <Paper key={tl.id} elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
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
