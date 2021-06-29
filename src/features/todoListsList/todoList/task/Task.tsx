import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TasksType} from "../../../../api/todolist-api";
import {TasksDomainType} from "../../taskReduser";


export type TasksPropsType = {
    idTodolist: string
    task:  TasksDomainType
    removeTask: (toDoListId: string, taskId: string) => void
    chahgeTaskTitle: (toDoListId: string, taskId: string, newTitle: string) => void
    chahgeTaskStatus: (toDoListId: string, taskId: string, status: TaskStatuses) => void
}

const Task = React.memo((props: TasksPropsType) => {
    console.log('add task')

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
                disabled={props.task.entityTaskStatus === 'loading'}
            />

            <EditableSpan
                title={props.task.title}
                changeTitle={chahgeTaskTitle}
                entityTaskStatus={props.task.entityTaskStatus}
            />
            <IconButton onClick={removeTask} disabled={props.task.entityTaskStatus === 'loading'}>
                <Delete/>
            </IconButton>

        </li>
    )
})

export default Task