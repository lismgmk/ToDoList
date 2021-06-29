import {Provider} from "react-redux";
import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {taskReduser} from "../features/todoListsList/taskReduser";
import {toDoListReduser} from "../features/todoListsList/toDoListReduser";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "../app/app-reduser";
import thunk from "redux-thunk";

const toDoListID_1 = v1()
const toDoListID_2 = v1()


const InitialReduser = {
    todolists: [
        {id: toDoListID_1, title: "What to learn", filter: 'all', addedDate: '', order: 0},
        {id: toDoListID_2, title: "What to bye", filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        [toDoListID_1]: [
            {id: v1(), title: "HTML&CSS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: ''},
            {id: v1(), title: "JS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: ''},
            {id: v1(), title: "REACTJS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: ''}
        ],
        [toDoListID_2]: [
            {id: v1(), title: "Milk",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: ''
            },
            {id: v1(), title: "Beer",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: ''
            },
            {id: v1(), title: "Water",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: ''
            }
        ]
    }
}



const rootReducer = combineReducers({
    tasks: taskReduser,
    todolists: toDoListReduser,
    app: appReducer
})

export const storeStory = createStore(rootReducer, InitialReduser as AppRootStateType, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export const ReduxStoreProvideDecoranor = (storyFn: any) => (
        <Provider store={storeStory}>
            {storyFn()}
        </Provider>
    )


