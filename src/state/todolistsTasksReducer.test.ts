import {TasksStateType, ToDoListType} from "../AppWithRedux";
import {AddToDoListAT,  toDoListReduser} from "./toDoListReduser";
import {taskReduser} from "./taskReduser";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = AddToDoListAT("new todolist", 'newId-1');

    const endTasksState = taskReduser(startTasksState, action)
    const endTodolistsState = toDoListReduser(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.idToDoList);
    expect(idFromTodolists).toBe(action.idToDoList);
});