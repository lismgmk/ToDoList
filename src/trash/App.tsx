import React, {ChangeEvent, useState} from 'react';
import '../app/App.css';
import TodoList, {FilterValuesType} from "../features/todoListsList/todoList/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TasksType} from "../api/todolist-api";
import {ToDoListDomainType} from "../features/todoListsList/TodoListsList";
import {TasksStateType} from "../features/todoListsList/taskReduser";


function App() {
    //bll
    const [newValue, setNewValue] = useState('')
    const toDoListID_1 = v1()
    const toDoListID_2 = v1()

    const [ toDoLists, setToDoLists] = useState<Array<ToDoListDomainType>>([
        {id: toDoListID_1, title: "What to learn", filter: 'all', addedDate: '', order: 0},
        {id: toDoListID_2, title: "What to bye", filter: 'all', addedDate: '', order: 0}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [toDoListID_1]: [
            {id: v1(), title: "HTML&CSS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: ''},
            {id: v1(), title: "JS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: ''},
            {id: v1(), title: "REACTJS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: ''}
        ],
        [toDoListID_2]: [
            {id: v1(), title: "Milk",
             description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: ''
            },
            {id: v1(), title: "Beer",
             description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: ''
            },
            {id: v1(), title: "Water",
             description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: ''
            }
        ]
    })


    function changeTaskStatus(toDoListID: string, taskID: string, newisDoneValue: TaskStatuses ){
        const updatedTasks = tasks[toDoListID].map((i)=>{
            if(i.id === taskID){
                return {...i, status: newisDoneValue}
            }
            return i
        } )
        setTasks({...tasks, [toDoListID]: updatedTasks})
    }
    function changeTaskTitle(toDoListID: string, taskID: string, title: string){
        debugger
        const updatedTasks = tasks[toDoListID].map((i)=>{
            if(i.id === taskID){
                return {...i, title: title}
            }
            return i
        } )
        setTasks({...tasks, [toDoListID]: updatedTasks})
    }
    function removeTask(toDoListID: string, taskId: string) {
        const updatedTasks = tasks[toDoListID].filter(i => i.id !== taskId);
        setTasks({
            ...tasks,
            [toDoListID]: updatedTasks
        })
    }
    function addTask(title: string, toDoListID: string) {
        const newTasks = {
            id: v1(),
            title,
            description: '',
            completed: true,
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            deadline: '',
            todoListId: toDoListID_2,
            order: 1,
            addedDate: '',
            startDate: ''
        }

        const upDatedTasks = [newTasks, ...tasks[toDoListID]]
        setTasks({...tasks, [toDoListID]: upDatedTasks})
    }

    function removeToDoList (toDoListID: string) {
        const updatedToDoLists = toDoLists.filter(i => i.id !== toDoListID);
        setToDoLists(updatedToDoLists)
        delete  tasks[toDoListID]
    }

    function changeToDoListFilter(newFiltervalue: FilterValuesType, toDoListID: string) {
        const updatedToDoLists = toDoLists.map(i => i.id === toDoListID ? {...i, filter: newFiltervalue}: i);
        setToDoLists(updatedToDoLists)
    }
    function addToDoList (title: string) {
        const newToDoListId = v1()
        const newToDoList: ToDoListDomainType = {
            id: newToDoListId, title, filter: 'all', addedDate: '', order: 0
        }
        setToDoLists([...toDoLists, newToDoList])
        setTasks({...tasks, [newToDoListId]: []})
    }
    function getTaskForToDoList ( filter: FilterValuesType, toDoListId: string): Array<TasksType> {
        switch (filter) {
            case "active":
                return tasks[toDoListId].filter( i => i.status === TaskStatuses.New)
            case "completed":
                return tasks[toDoListId].filter(i => i.status === TaskStatuses.Completed)
            default:
                return tasks[toDoListId]
        }
    };
    function changeToDoListTitle(title: string, toDoListID: string){
        const updatedToDoLists = toDoLists.map(tl => tl.id === toDoListID ? {...tl, title} : tl)
        setToDoLists(updatedToDoLists)
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
        return setNewValue(e.currentTarget.value)
    }

    const todoListComponents = toDoLists.map((tl) =>{
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        allTask={tasks[tl.id]}
                        // setFilter={getTaskForToDoList}
                        setFilter={changeToDoListFilter}
                        changeTitleTodoList={changeToDoListTitle}
                        addTask={addTask}
                        deleteToDoList={removeToDoList}
                        removeTask={removeTask}
                        chahgeTaskTitle={changeTaskTitle}
                        chahgeTaskStatus={changeTaskStatus}
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
}

export default App;
