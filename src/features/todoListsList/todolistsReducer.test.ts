import {
    AddToDoListAT,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT,
    RemoveToDoListAT,
    toDoListReduser
} from './toDoListReduser';
import {v1} from 'uuid';
import {ToDoListDomainType} from "./TodoListsList";



let todolistId1: string
let todolistId2: string
let startState: Array<ToDoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

        startState = [
            {id: todolistId1, title: "What to learn", filter: 'all', addedDate: '', order: 0, entityStatys: "idle"},
            {id: todolistId2, title: "What to bye", filter: 'all', addedDate: '', order: 0, entityStatys: "idle"}
        ]
    }
)



test('correct todolist should be removed', () => {


    const endState = toDoListReduser(startState, RemoveToDoListAT(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be add', () => {


    const endState = toDoListReduser(startState, AddToDoListAT('New task'))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New task");
});


test('correct todolist should be CHANGE-TODOLIST-TITLE', () => {

    const endState = toDoListReduser(startState, ChangeToDoListTitleAT("Change title", todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("Change title");
});


test('correct todolist should be CHANGE-TODOLIST-FILTER', () => {


    const endState = toDoListReduser(startState, ChangeToDoListFilterAT('active', todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe("active");
});

