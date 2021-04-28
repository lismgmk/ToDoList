import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemPropsType = { //родительский колбэк
    addItem: (title: string) => void
}

function AddItemForm (props: AddItemPropsType){
    const [error, setError] = useState<string|null>(null)
    const [title, setTitle] = useState<string>('')

    const errorMessage = error ? <div>{error}</div> : null
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
            // setError(null)
        } else{
            setError('Ошибка ввода')
        }
        setTitle('')
    }
    const onKeyPressAddItem = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addItem()
        }
    }


    return(
        <div>
            <TextField
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                variant={'outlined'}
                label={'Title'}
                error = {!!error}
                helperText={error}
            />


            <IconButton onClick = {addItem} color={'primary'}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
}

export default AddItemForm;











