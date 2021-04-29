import {
    AddToDoListAT,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT,
    RemoveToDoListAT,
    toDoListReduser
} from './toDoListReduser';
import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReduser(startState, RemoveToDoListAT(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReduser(startState, AddToDoListAT('New task'))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New task");
});


test('correct todolist should be CHANGE-TODOLIST-TITLE', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReduser(startState, ChangeToDoListTitleAT("Change title", todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("Change title");
});


test('correct todolist should be CHANGE-TODOLIST-FILTER', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReduser(startState, ChangeToDoListFilterAT('active', todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("active");
});

