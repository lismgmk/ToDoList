import React, {useCallback, useEffect} from "react";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskThunkAT, fetchTasksThunkAT, removeTaskThunkAT, TasksDomainType} from "../taskReduser";
import {ChangeToDoListFilterAT, deleteTodolistsThunkAT, updateTodolistsThunkAT} from "../toDoListReduser";
import Task from "./task/Task";
import {TaskStatuses, TasksType, todolistAPI} from "../../../api/todolist-api";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "../../../app/app-reduser";


type  PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    allTask: Array<TasksDomainType>
    setFilter: (filter: FilterValuesType, toDoListId: string) => void
    changeTitleTodoList: (title: string, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    deleteToDoList: (toDoListId: string) => void
    removeTask: (toDoListId: string, taskId: string) => void
    chahgeTaskTitle: (toDoListId: string, taskId: string, newTitle: string) => void
    chahgeTaskStatus: (toDoListId: string, taskId: string, status: TaskStatuses) => void
    demo?: boolean
    entityStatys: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed"

const TodoList = React.memo((props: PropsType) => {
    console.log('ToDoList')


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasksThunkAT(props.id))
    }, [])

    let allToDoLists = props.allTask;
    let taskForToDolist = allToDoLists;

    if (props.filter == "active") {
        taskForToDolist = allToDoLists.filter(tl => tl.status === TaskStatuses.New)
    }

    if (props.filter === "completed") {
        taskForToDolist = allToDoLists.filter(tl => tl.status === TaskStatuses.Completed)
    }


    const task = taskForToDolist.map((i) => {
        return (

            <Task
                key={i.id}
                idTodolist={props.id}
                task={i}
                chahgeTaskStatus={props.chahgeTaskStatus}
                chahgeTaskTitle={props.chahgeTaskTitle}
                removeTask={props.removeTask}
            />

        )
    })

    const deleteToDoList = useCallback(() => props.deleteToDoList(props.id), [props.id]);

    const setAllFilterValue = useCallback(() => {
        props.setFilter('all', props.id)
    }, [props.id])
    const setActiveFilterValue = useCallback(() => {
        props.setFilter('active', props.id)
    }, [props.id])
    const setCompletedFilterValue = useCallback(() => {
        props.setFilter('completed', props.id)
    }, [props.id])

    const changeTitleTodoListHander = useCallback((title: string) => props.changeTitleTodoList(title, props.id), [props.id])
    const addTask = useCallback(
        (title: string) =>
            props.addTask(props.id, title)
        , [props.id])

    return (
        <div>
            <h3>

                <EditableSpan
                    title={props.title}
                    changeTitle={changeTitleTodoListHander}

                />

                <IconButton onClick={deleteToDoList} disabled={props.entityStatys === 'loading'} >
                    <Delete/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask} disabled={props.entityStatys === 'loading'}/>


            <ul style={{listStyle: 'none', padding: '0px'}}>


                {task}


            </ul>
            <div>
                <Button
                    size={"small"}

                    variant={props.filter == 'all' ? 'outlined' : 'contained'}
                    // className={props.toDoListFilter == 'all' ? 'active-filter' : ''}
                    onClick={setAllFilterValue}>
                    All
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter == 'active' ? 'outlined' : 'contained'}
                    // className={props.toDoListFilter == 'active' ? 'active-filter' : '}
                    onClick={setActiveFilterValue}>
                    Active
                </Button>
                <Button

                    size={"small"}
                    variant={props.filter == 'completed' ? 'outlined' : 'contained'}
                    // className={props.toDoListFilter == 'completed' ? 'active-filter' : ''}
                    onClick={setCompletedFilterValue}>
                    Completed
                </Button>

            </div>
        </div>

    )

})

export default TodoList