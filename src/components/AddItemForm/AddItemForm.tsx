import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


export type addItemFormType = {
    addItem: (title : string) => void
    disabled?: boolean
}


const AddItemForm = React.memo(function (props: addItemFormType){
    console.log('Add item form')

    const [error, setError] = useState<string|null>(null)
    const [title, setTitle] = useState<string>('')



    const errorMessage = error ? <div>{error}</div> : null
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    },[title, error] )

    const addItem = useCallback (() => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        }
        else{
            setError('Ошибка ввода')
        }
        setTitle('')
    },[title, props.addItem, error] )

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
                disabled={props.disabled}
            />


            <IconButton onClick = {addItem} color={'primary'} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
})


export default AddItemForm;











