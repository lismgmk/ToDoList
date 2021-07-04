import {applyMiddleware, combineReducers, createStore} from 'redux';
import {taskReduser} from "../features/todoListsList/taskReduser";
import {toDoListReduser} from "../features/todoListsList/toDoListReduser";
import thunk from "redux-thunk";
import {appReducer} from "./app-reduser";
import {loginReduser} from "../features/login/loginReduser";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: taskReduser,
    todolists: toDoListReduser,
    app: appReducer,
    login: loginReduser
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

