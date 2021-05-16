import React, {ChangeEvent, KeyboardEvent, useCallback, useMemo, useState} from "react";
import {FilterValuesType, mytasksType, TasksStateType, tasksType, ToDoListType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReduser";
import {ChangeToDoListFilterAT, ChangeToDoListTitleAT, RemoveToDoListAT} from "./state/toDoListReduser";
import Task from "./Task";


type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type  PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const TodoList = React.memo((props: PropsType) => {
    console.log('ToDoList')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();


    let allToDoLists = tasks;
    let taskForToDolist = allToDoLists;

    if (props.filter == "active") {
        taskForToDolist = allToDoLists.filter(tl => tl.isDone === false)
    }

    if (props.filter === "completed") {
        taskForToDolist = allToDoLists.filter(tl => tl.isDone === true)
    }


    const task = taskForToDolist.map((i) => {
        return (

                <Task
                    key={i.id}
                    idTodolist={props.id}
                    idTask={i.id}
                    isDone={i.isDone}
                    title={i.title}
                />

        )
        // const chahgeStatus = (e: ChangeEvent<HTMLInputElement>) =>
        //     dispatch(changeTaskStatusAC(i.id, e.currentTarget.checked, props.id));
        // return (
        //     <li key={i.id}>
        //
        //         <Checkbox
        //             color={'primary'}
        //             onChange={chahgeStatus}
        //             checked={i.isDone}
        //         />
        //
        //         <EditableSpan
        //             title={i.title}
        //             changeTitle={(title: string) => dispatch(changeTaskTitleAC(i.id, title, props.id))}
        //
        //         />
        //         <IconButton onClick={() => dispatch(removeTaskAC(i.id, props.id))}>
        //             <Delete/>
        //         </IconButton>
        //
        //     </li>
        // )
    })

    const setAllFilterValue = useCallback(() => {
        dispatch(ChangeToDoListFilterAT('all', props.id))
    } ,[props.id])
    const setActiveFilterValue = useCallback(() => {
        dispatch(ChangeToDoListFilterAT('active', props.id))
    } ,[props.id])
    const setCompletedFilterValue = useCallback(() => {
        dispatch(ChangeToDoListFilterAT('completed', props.id))
    } ,[props.id])

    const changeTitleTodoListHander = useCallback((title: string) => dispatch(ChangeToDoListTitleAT(title, props.id)) ,[props.id])
    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.id)) , [ props.id])

    return (
        <div>
            <h3>

                <EditableSpan
                    title={props.title}
                    changeTitle={changeTitleTodoListHander}
                />

                <IconButton onClick={() => dispatch(RemoveToDoListAT(props.id))}>
                    <Delete/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask}/>


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