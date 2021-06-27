import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo(function (props: EditableSpanType){

    console.log('add editable span')

    const [error, setError] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const offEditMode = () => {
        setEditMode(false)
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.changeTitle(title)
        } else {
            setError(true)
        }

    }
    return (
        editMode
            ?
            <TextField
                color={'primary'}
                variant={'standard'}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

export default EditableSpan