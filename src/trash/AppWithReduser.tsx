import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddToDoListAT,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT,
    RemoveToDoListAT,
    toDoListReduser
} from "../features/todoListsList/toDoListReduser";
import {addTaskAC, removeTaskAC, taskReduser, TasksStateType, updateTaskAC} from "../features/todoListsList/taskReduser";
import {TaskPriorities, TaskStatuses, TasksType} from "../api/todolist-api";
import TodoList, {FilterValuesType} from "../features/todoListsList/todoList/TodoList";
import AddItemForm from "../components/AddItemForm/AddItemForm";


function AppWithReduser() {

    const [newValue, setNewValue] = useState('')
    const toDoListID_1 = v1()
    const toDoListID_2 = v1()

    let [toDoLists, dispatchToToDoList] = useReducer(toDoListReduser, [
        {id: toDoListID_1, title: "What to learn", filter: 'all', addedDate: '', order: 0, entityStatys: "idle"},
        {id: toDoListID_2, title: "What to bye", filter: 'all', addedDate: '', order: 0, entityStatys: "idle"}
    ])
    let [tasks, dispatchToTask] = useReducer(taskReduser, {
        [toDoListID_1]: [
            {
                id: v1(), title: "HTML&CSS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: v1(), title: "JS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: v1(), title: "REACTJS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ],
        [toDoListID_2]: [
            {
                id: v1(), title: "Milk",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: v1(), title: "Beer",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: v1(), title: "Water",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ]
    })

    function changeTaskStatus(taskID: string, toDoListID: string) {
        dispatchToTask(updateTaskAC(toDoListID, taskID, {status: TaskStatuses.Completed}))
    }

    function changeTaskTitle(taskID: string, toDoListID: string) {
        dispatchToTask(updateTaskAC(toDoListID, taskID, {title: 'Job'}))
    }

    function removeTask(taskId: string, toDoListID: string) {
        dispatchToTask(removeTaskAC(toDoListID, taskId))
    }

    function addTask(title: string, toDoListId: string) {
        dispatchToTask(addTaskAC({
            id: v1(),
            title: title,
            description: '',
            completed: true,
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            deadline: '',
            todoListId: toDoListId,
            order: 1,
            addedDate: '',
            startDate: ''
        }))
    }

    function removeToDoList(toDoListID: string) {
        dispatchToToDoList(RemoveToDoListAT(toDoListID))
        delete tasks[toDoListID]
    }

    function changeToDoListFilter(newFiltervalue: FilterValuesType, toDoListID: string) {
        dispatchToToDoList(ChangeToDoListFilterAT(newFiltervalue, toDoListID))
    }

    function addToDoList(title: string) {
        const action = AddToDoListAT(title, v1())
        dispatchToToDoList(action)
        dispatchToTask(action)
    }

    function changeToDoListTitle(title: string, toDoListID: string) {
        dispatchToToDoList(ChangeToDoListTitleAT(title, toDoListID))
    }


    const todoListComponents = toDoLists.map((tl) => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        entityStatys={tl.entityStatys}
                        deleteToDoList={removeToDoList}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        allTask={tasks[tl.id]}
                        setFilter={changeToDoListFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        filter={tl.filter}
                        chahgeTaskStatus={changeTaskStatus}
                        chahgeTaskTitle={changeTaskTitle}
                        changeTitleTodoList={changeToDoListTitle}
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
                    {todoListComponents}
                </Grid>

            </Container>

        </div>
    )
};

export default AppWithReduser;
