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


type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type PropsType = {
    idTodolist: string
    idTask: string
    isDone: boolean
    title: string
}

const Task = React.memo((props: PropsType ) => {
    console.log('add task')

    const dispatch = useDispatch();

    const chahgeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(props.idTask, e.currentTarget.checked, props.idTodolist)) , [props.idTask, props.idTodolist]) ;

        return (
            <li key={props.idTask}>

                <Checkbox
                    color={'primary'}
                    onChange={chahgeStatus}
                    checked={props.isDone}
                />

                <EditableSpan
                    title={props.title}
                    changeTitle={(title: string) => dispatch(changeTaskTitleAC(props.idTask, title, props.idTodolist))}

                />
                <IconButton onClick={() => dispatch(removeTaskAC(props.idTask, props.idTodolist))}>
                    <Delete/>
                </IconButton>

            </li>
        )




})

export default Task