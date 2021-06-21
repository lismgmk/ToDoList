import React, {ChangeEvent, KeyboardEvent, useCallback, useMemo, useState} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    addTaskAC,
    chahgeTaskStatusThunkAT, chahgeTaskTitleThunkAT,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskThunkAT
} from "./state/taskReduser";



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



    const chahgeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        dispatch(chahgeTaskStatusThunkAT(props.idTask, e.currentTarget.checked, props.idTodolist)) , [props.idTask, props.idTodolist]) ;

        return (
            <li key={props.idTask}>

                <Checkbox
                    color={'primary'}
                    onChange={chahgeStatus}
                    checked={props.isDone}
                />

                <EditableSpan
                    title={props.title}
                    changeTitle={useCallback((title: string) => dispatch(chahgeTaskTitleThunkAT(props.idTask, title, props.idTodolist)),[])}

                />
                <IconButton onClick={useCallback(() => dispatch(removeTaskThunkAT( props.idTodolist, props.idTask)) ,[])}>
                    <Delete/>
                </IconButton>

            </li>
        )




})

export default Task