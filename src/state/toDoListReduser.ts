import {FilterValuesType, ToDoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveToDoListTypeAT = ReturnType<typeof RemoveToDoListAT>
export type AddToDoListTypeAT = ReturnType<typeof AddToDoListAT>
export type GetToDoListsTypeAT = ReturnType<typeof GetToDoListsAT>

type ActionType =
    | RemoveToDoListTypeAT
    | AddToDoListTypeAT
    | GetToDoListsTypeAT
    | ReturnType<typeof ChangeToDoListTitleAT>
    | ReturnType<typeof ChangeToDoListFilterAT>


export const toDoListReduser = (toDoLists: Array<ToDoListType>=[], action: ActionType) : Array<ToDoListType> => {
    switch (action.type) {
        case "GET-TODOLISTS":
            return  action.ApiToDoLists.map((tl)=>{
                return {...tl, filter: 'all'}
            });
        case "REMOVE-TODOLIST":
            return toDoLists.filter(i => i.id !== action.toDoListID)
        case "ADD-TODOLIST":
            return [...toDoLists, {
                id: action.idToDoList, title: action.title, filter: 'all'
            }]
        case "CHANGE-TODOLIST-TITLE":
            return toDoLists.map(tl => tl.id === action.toDoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return toDoLists.map(tl => tl.id === action.toDoListID ? {...tl, filter: action.newFiltervalue} : tl)
        default:
            return toDoLists
    }
}



export const RemoveToDoListAT = (id: string) => ({type: "REMOVE-TODOLIST", toDoListID: id}) as const
export const AddToDoListAT = (newTitle: string, idToDoList: string) => ({
    type: "ADD-TODOLIST", title: newTitle, idToDoList}) as const
export const ChangeToDoListTitleAT = (newTitle: string, newId: string) => ({
        type: "CHANGE-TODOLIST-TITLE",
        title: newTitle,
        toDoListID: newId
    }) as const
export const ChangeToDoListFilterAT = (newFilter: FilterValuesType, newId: string) => ({
        type: "CHANGE-TODOLIST-FILTER",
        newFiltervalue: newFilter,
        toDoListID: newId
    } )as const
export const GetToDoListsAT  = (toDoLists: Array<TodolistType>) => ({
        type: "GET-TODOLISTS",
        ApiToDoLists: toDoLists
    }) as const


export const fetchTodolistsThunkAT = () =>  (dispatch: Dispatch<ActionType>)=>{
        todolistAPI.getTodolist()
            .then(data =>
                dispatch(GetToDoListsAT(data.data))
            )
    }
export const deleteTodolistsThunkAT = (toDolistId: string) =>  (dispatch: Dispatch<ActionType>)=>{
        todolistAPI.deleteTodolist(toDolistId)
            .then(data =>
                dispatch(RemoveToDoListAT(toDolistId))
            )
    }
export const addTodolistsThunkAT = (newTitle: string) =>  (dispatch: Dispatch<ActionType>)=>{
        todolistAPI.postTodolist(newTitle)
            .then(data => dispatch(AddToDoListAT(data.data.data.item.title, data.data.data.item.id))
            )
    }
export const updateTodolistsThunkAT = (newTitle: string, toDoListId: string) =>  (dispatch: Dispatch<ActionType>)=>{
        todolistAPI.updateTodolist(toDoListId, newTitle)
            .then(data => dispatch(ChangeToDoListTitleAT(newTitle, toDoListId))
            )
    }




