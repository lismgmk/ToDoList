
import {AddToDoListAT,  toDoListReduser} from "./toDoListReduser";
import {taskReduser, TasksStateType} from "./taskReduser";
import {ToDoListDomainType} from "./TodoListsList";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListDomainType> = [];

    // const action = AddToDoListAT("new todolist", 'toDoListID_New');

    // const endTasksState = taskReduser(startTasksState, action)
    // const endTodolistsState = toDoListReduser(startTodolistsState, action)
    //
    // const keys = Object.keys(endTasksState);
    // const idFromTasks = keys[0];
    // const idFromTodolists = endTodolistsState[0].id;

    // expect(idFromTasks).toBe(action.idToDoList);
    // expect(idFromTodolists).toBe(action.idToDoList);
});