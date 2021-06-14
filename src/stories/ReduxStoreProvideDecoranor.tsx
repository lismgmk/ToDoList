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

const InitialReduser = {
    todolists: [
        {id: toDoListID_1, title: "What to learn", filter: 'all'},
        {id: toDoListID_2, title: "What to bye", filter: 'all'}
    ],
    tasks: {
        [toDoListID_1]: [
            {id: v1(), title: "HTML&CSS", completed: true},
            {id: v1(), title: "JS", completed: true},
            {id: v1(), title: "REACTJS", completed: false}
        ],
        [toDoListID_2]: [
            {id: v1(), title: "Milk", completed: true},
            {id: v1(), title: "Beer", completed: true},
            {id: v1(), title: "Water", completed: false}
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
