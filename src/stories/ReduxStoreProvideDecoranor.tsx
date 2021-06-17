import {Provider} from "react-redux";
import React from 'react';
import {store} from "../store";
import AddItemForm from "../AddItemForm";

import {combineReducers, createStore} from 'redux';
import {taskReduser} from "../state/taskReduser";
import {toDoListReduser} from "../state/toDoListReduser";
import {v1} from "uuid";

const toDoListID_1 = v1()
const toDoListID_2 = v1()

let elseParam = {
    description: 'some string',
    status: 5,
    priority: 5,
    startDate: 'some string',
    deadline: 'some string',
    todoListId: 'some string',
    order: 5,
    addedDate: 'some string'
}



const InitialReduser = {
    todolists: [
        {id: toDoListID_1, title: "What to learn", filter: 'all'},
        {id: toDoListID_2, title: "What to bye", filter: 'all'}
    ],
    tasks: {
        [toDoListID_1]: [
            {id: "1", title: "CSS", completed: false, ...elseParam},
            {id: "2", title: "JS", completed: true, ...elseParam},
            {id: "3", title: "React", completed: false, ...elseParam}
        ],
        [toDoListID_2]: [
            {id: "1", title: "bread", completed: false, ...elseParam},
            {id: "2", title: "milk", completed: true, ...elseParam},
            {id: "3", title: "tea", completed: false, ...elseParam}
        ]
    }
}



const rootReducer = combineReducers({
    tasks: taskReduser,
    todolists: toDoListReduser
})

export const storeStory = createStore(rootReducer, InitialReduser as AppRootStateType);

export type AppRootStateType = ReturnType<typeof rootReducer>

export const ReduxStoreProvideDecoranor = (storyFn: any) => {
    return (
        <Provider store={storeStory}>
            {storyFn()}
        </Provider>
    )

}
