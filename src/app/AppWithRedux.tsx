import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import TodoListsList, {ToDoListDomainType} from "../features/todoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {InitialStateType, RequestStatusType} from "./app-reduser";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";



function AppWithRedux() {

    const progresLoad = useSelector<AppRootStateType, InitialStateType>(state => state.app)

    return (

        <div className="App">
            <ErrorSnackbar/>
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
                { progresLoad.status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    )
}


export default AppWithRedux;

