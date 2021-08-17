import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import './App.css';
import {
    AppBar,
    Button, CircularProgress,
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {InitialStateType, RequestStatusType} from "./app-reduser";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/login/login";
import {initialazedThunkAT, logoutThunkAT} from "../features/login/loginReduser";


function AppWithRedux() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialazedThunkAT())
    }, [])


    const isLogout = useCallback(() => {
        dispatch(logoutThunkAT())
    }, [])

    const progresLoad = useSelector<AppRootStateType, InitialStateType>(state => state.app)
    const initial = useSelector<AppRootStateType, boolean>(state => state.login.initialazed)

    if (initial) {
        return <CircularProgress color="secondary"/>
    }
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
                    <Button variant={'outlined'}
                            color="inherit"
                            onClick={isLogout}
                    >LogOut</Button>
                </Toolbar>
                {progresLoad.status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={"/ToDoList"} render={()=><TodoListsList/> }/>
                    <Route exact path={"/"} render={()=><TodoListsList/> }/>
                    <Route path={"/login"} render={()=><Login/>} />

                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>

                </Switch>


            </Container>
        </div>
    )
}


export default AppWithRedux;

