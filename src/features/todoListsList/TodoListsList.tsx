import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import '../../app/App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {TaskStatuses, TodolistType} from "../../api/todolist-api";
import TodoList, {FilterValuesType} from "./todoList/TodoList";
import {
    addTodolistsThunkAT, ChangeToDoListFilterAT,
    deleteTodolistsThunkAT,
    fetchTodolistsThunkAT,
    updateTodolistsThunkAT
} from "./toDoListReduser";
import {AppRootStateType} from "../../app/store";
import {addTaskThunkAT, removeTaskThunkAT, TasksStateType, updateTaskThunkAT} from "./taskReduser";
import {RequestStatusType} from "../../app/app-reduser";
import {initialazedThunkAT} from "../login/loginReduser";
import {Redirect} from "react-router-dom";

export type ToDoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatys: RequestStatusType
}


type todoListsType = {}
const TodoListsList: React.FC<todoListsType> = (props) => {

    useEffect(() => {
            dispatch(fetchTodolistsThunkAT())

        },
        [])

    const toDoLists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.todolists);
    let task = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    let loged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const dispatch = useDispatch();

    const addToDoList = useCallback((toDoListTitle: string) => {
        dispatch(addTodolistsThunkAT(toDoListTitle))
    }, [dispatch])

    const changeTitleTodoList = useCallback((title: string, toDoListId: string) =>
        dispatch(updateTodolistsThunkAT(title, toDoListId)), [])

    const deleteToDoList = useCallback((toDoListId: string) => {
        dispatch(deleteTodolistsThunkAT(toDoListId))
    }, [])

    const setFilterValue = useCallback((filter: FilterValuesType, toDoListId: string) => {
        dispatch(ChangeToDoListFilterAT(filter, toDoListId))
    }, [])

    const addTask = useCallback(
        (toDoListId: string, title: string) =>
            dispatch(addTaskThunkAT(toDoListId, title))
        , [])

    const chahgeTaskTitle = useCallback((toDoListId: string, taskId: string, newTitle: string) =>
        dispatch(updateTaskThunkAT(toDoListId, taskId, {title: newTitle})), []);

    const chahgeTaskStatus = useCallback((toDoListId: string, taskId: string, status: TaskStatuses) =>
        dispatch(updateTaskThunkAT(toDoListId, taskId, {status: status})), [])

    const removeTask = useCallback(
        (toDoListId: string, taskId: string) =>
            dispatch(removeTaskThunkAT(toDoListId, taskId))
        , [])


    const todoListComponents = toDoLists.map((tl) => {
        let allToDoListTasks = task[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper key={tl.id} elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        entityStatys={tl.entityStatys}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        allTask={allToDoListTasks}
                        setFilter={setFilterValue}
                        changeTitleTodoList={changeTitleTodoList}
                        addTask={addTask}
                        deleteToDoList={deleteToDoList}
                        removeTask={removeTask}
                        chahgeTaskTitle={chahgeTaskTitle}
                        chahgeTaskStatus={chahgeTaskStatus}

                    />
                </Paper>
            </Grid>
        )
    })
    if (!loged ) {
        return <Redirect to='/login'/>
    }



    return (
        <>
            <Grid container style={{padding: "20px 0px"}}>
                <AddItemForm addItem={addToDoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoListComponents}
            </Grid>
        </>
    )
}

export default TodoListsList