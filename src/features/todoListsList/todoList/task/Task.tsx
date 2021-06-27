import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TasksType} from "../../../../api/todolist-api";


export type TasksPropsType = {
    idTodolist: string
    task:  TasksType
    removeTask: (toDoListId: string, taskId: string) => void
    chahgeTaskTitle: (toDoListId: string, taskId: string, newTitle: string) => void
    chahgeTaskStatus: (toDoListId: string, taskId: string, status: TaskStatuses) => void
}

const Task = React.memo((props: TasksPropsType) => {
    console.log('add task')

debugger
    const chahgeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        props.chahgeTaskStatus(props.idTodolist, props.task.id, newIsDoneValue)
    }, [props.idTodolist, props.task.id])


    const chahgeTaskTitle = useCallback((title: string) => props.chahgeTaskTitle(props.idTodolist, props.task.id, title), [props.idTodolist, props.task.id])
    const removeTask = useCallback(() => props.removeTask(props.idTodolist, props.task.id), [props.idTodolist, props.task.id])


    return (
        <li key={props.task.id}>

            <Checkbox
                color={'primary'}
                onChange={chahgeTaskStatus}
                checked={props.task.status == TaskStatuses.Completed}
            />

            <EditableSpan
                title={props.task.title}
                changeTitle={chahgeTaskTitle}

            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>

        </li>
    )
})

export default Task