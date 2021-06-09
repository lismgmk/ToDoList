import {FilterValuesType, ToDoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveToDoListAT = {
    type: "REMOVE-TODOLIST"
    toDoListID: string
}

export type AddToDoListAT = {
    type: "ADD-TODOLIST"
    title: string
    idToDoList: string

}

export type ChangeToDoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    toDoListID: string
}

export type ChangeToDoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    newFiltervalue: FilterValuesType
    toDoListID: string
}

export type GetToDoListTypeAT = {
    type: "GET-TODOLISTS"
    ApiToDoLists: Array<TodolistType>
}

type ActionType = RemoveToDoListAT | AddToDoListAT | ChangeToDoListTitleAT | ChangeToDoListFilterAT | GetToDoListTypeAT

export const toDoListReduser = (toDoLists: Array<ToDoListType>=[], action: ActionType) : Array<ToDoListType> => {
    switch (action.type) {
        case "GET-TODOLISTS":
            return  action.ApiToDoLists.map((tl)=>{
                return {...tl, filter: 'all'}
            });
        case "REMOVE-TODOLIST":
            return toDoLists.filter(i => i.id !== action.toDoListID)
        case "ADD-TODOLIST":
            const newToDoList: ToDoListType = {
                id: action.idToDoList, title: action.title, filter: 'all',
            }
            return [...toDoLists, newToDoList]
        case "CHANGE-TODOLIST-TITLE":
            return toDoLists.map(tl => tl.id === action.toDoListID ? {...tl, title: action.title} : tl)


        case "CHANGE-TODOLIST-FILTER":
            return toDoLists.map(tl => tl.id === action.toDoListID ? {...tl, filter: action.newFiltervalue} : tl)
        default:
            return toDoLists
    }
}
export const RemoveToDoListAT = (id: string): RemoveToDoListAT => {
    return {type: "REMOVE-TODOLIST", toDoListID: id}
}

export const AddToDoListAT = (newTitle: string): AddToDoListAT => {
    return {type: "ADD-TODOLIST", title: newTitle, idToDoList: v1()}
}

export const ChangeToDoListTitleAT = (newTitle: string, newId: string): ChangeToDoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTitle,
        toDoListID: newId
    }
}

export const ChangeToDoListFilterAT = (newFilter: FilterValuesType, newId: string): ChangeToDoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        newFiltervalue: newFilter,
        toDoListID: newId
    }
}

export const GetToDoListsAT  = (toDoLists: Array<TodolistType>): GetToDoListTypeAT => {
    return {
        type: "GET-TODOLISTS",
        ApiToDoLists: toDoLists
    }
}

export const fetchTodolistsThunkAT = () => {
    return (dispatch: Dispatch)=>{
        todolistAPI.getTodolist()
            .then(data =>
                dispatch(GetToDoListsAT(data.data))
            )
    }
}

