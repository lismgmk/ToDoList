import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {FilterValuesType} from "./todoList/TodoList";
import {ToDoListDomainType} from "./TodoListsList";
import {
    RequestStatusType,
    setAppStatusAC,
} from "../../app/app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {log} from "util";
import {fetchTasksThunkAT} from "./taskReduser";


export type RemoveToDoListTypeAT = ReturnType<typeof RemoveToDoListAT>
export type AddToDoListTypeAT = ReturnType<typeof AddToDoListAT>
export type GetToDoListsTypeAT = ReturnType<typeof GetToDoListsAT>

const initialState: Array<ToDoListDomainType> = []


export const SliceToDo = createSlice({
    name: 'ToDoListSlice',
    initialState: initialState,
    reducers: {
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ entityStatys: RequestStatusType, idToDoList: string }>) {
            let index = state.findIndex(tl => tl.id === action.payload.idToDoList)
            state[index].entityStatys = action.payload.entityStatys
        },
        GetToDoListsAT(state, action: PayloadAction<{ ApiToDoLists: Array<TodolistType> }>) {
            return action.payload.ApiToDoLists.map((tl) => {
                return {...tl, filter: 'all', entityStatys: "idle"}
            })
        },
        ChangeToDoListFilterAT(state, action: PayloadAction<{ newFiltervalue: FilterValuesType, toDoListID: string }>) {
            let index = state.findIndex(tl => tl.id === action.payload.toDoListID);
            state[index].filter = action.payload.newFiltervalue
        },
        ChangeToDoListTitleAT(state, action: PayloadAction<{ title: string, toDoListID: string }>) {
            let index = state.findIndex(tl => tl.id === action.payload.toDoListID);
            state[index].title = action.payload.title
        },
        AddToDoListAT(state, action: PayloadAction<{ title: string, idToDoList: string }>) {
            state.unshift({
                id: action.payload.idToDoList,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatys: "idle"
            })
        },
        RemoveToDoListAT(state, action: PayloadAction<{ toDoListID: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.toDoListID)
            if (index !== -1) state.splice(index, 1)
        },
        ClearToDoAT(state, action) {
           return []
        },

    },
})

export const {
    changeTodolistEntityStatusAC,
    GetToDoListsAT,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT,
    AddToDoListAT,
    RemoveToDoListAT,
    ClearToDoAT
} = SliceToDo.actions

export const toDoListReduser = SliceToDo.reducer;

export const fetchTodolistsThunkAT = () => async (dispatch: Dispatch<any>) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try{
        const data = await todolistAPI.getTodolist()
        dispatch(GetToDoListsAT({ApiToDoLists: data.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return data.data
    }
    catch (e) {
        dispatch(setAppStatusAC({status: 'failed'}))
    }
    // todolistAPI.getTodolist()
    //     .then(data => {
    //             dispatch(GetToDoListsAT({ApiToDoLists: data.data}))
    //             dispatch(setAppStatusAC({status: 'succeeded'}))
    //             return data.data
    //         }
    //     )
        // .then(data => {
        //     debugger
        //         data.forEach(i => dispatch(fetchTasksThunkAT(i.id)))
        //     }
        // )
}

export const deleteTodolistsThunkAT = (toDolistId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({entityStatys: 'loading', idToDoList: toDolistId}))
    todolistAPI.deleteTodolist(toDolistId)
        .then(data => {
                dispatch(RemoveToDoListAT({toDoListID: toDolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const addTodolistsThunkAT = (newTitle: string) => (dispatch: Dispatch<any>) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.postTodolist(newTitle)
        .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(AddToDoListAT({title: data.data.data.item.title, idToDoList: data.data.data.item.id}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))

                } else {
                    handleServerAppError(data.data, dispatch)
                }
                return data
            }
        )
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
        .then(data => console.log(data))
}
export const updateTodolistsThunkAT = (newTitle: string, toDoListId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.updateTodolist(toDoListId, newTitle)
        .then(data => {
                dispatch(ChangeToDoListTitleAT({title: newTitle, toDoListID: toDoListId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}




