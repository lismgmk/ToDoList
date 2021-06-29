import {addTaskAC, removeTaskAC, taskReduser, TasksStateType, updateTaskAC} from './taskReduser';
import {AddToDoListAT, RemoveToDoListAT} from "./toDoListReduser";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

let toDoListID_1: string
let toDoListID_2: string
let startState: TasksStateType

beforeEach(()=>{
    toDoListID_1 = v1();
    toDoListID_2 = v1();

    startState = {
        [toDoListID_1]: [
            {id: '1', title: "HTML&CSS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
            entityTaskStatus: 'idle'},
            {id: '2', title: "JS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
            entityTaskStatus: 'idle'},
            {id: '3', title: "REACTJS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
            entityTaskStatus: 'idle'}
        ],
        [toDoListID_2]: [
            {id: '1', title: "Milk",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {id: '2', title: "Beer",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {id: '3', title: "Water",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC(toDoListID_2, "2");

    const endState = taskReduser(startState, action)

    expect(endState).toEqual({
        [toDoListID_1]: [
            {id: '1', title: "HTML&CSS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
            entityTaskStatus: 'idle'},
            {id: '2', title: "JS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
            entityTaskStatus: 'idle'},
            {id: '3', title: "REACTJS",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_1,
                order: 1,
                addedDate: '',
                startDate: '',
            entityTaskStatus: 'idle'}
        ],
        [toDoListID_2]: [
            {id: '1', title: "Milk",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {id: '3', title: "Water",
                description: '',
                completed: true,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                deadline: '',
                todoListId: toDoListID_2,
                order: 1,
                addedDate: '',
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ]
    });
});



test('correct task should be added to correct array', () => {

    const task = {
        id: '4',
        title: "juce",
        description: '',
        completed: true,
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        deadline: '',
        todoListId: toDoListID_2,
        order: 1,
        addedDate: '',
        startDate: '',
        entityTaskStatus: 'idle'
    }

    const action = addTaskAC(task);

    const endState = taskReduser(startState, action)

    expect(endState[toDoListID_1].length).toBe(3);
    expect(endState[toDoListID_2].length).toBe(4);
    expect(endState[toDoListID_2][0].id).toBeDefined();
    expect(endState[toDoListID_2][3].title).toBe("juce");
    expect(endState[toDoListID_2][3].completed).toBe(true);
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC(toDoListID_2,  '2', {status: TaskStatuses.Completed} );
    const endState = taskReduser(startState, action)
    expect(endState[toDoListID_2][1].status).toBe(TaskStatuses.Completed);
    expect(endState[toDoListID_1][1].status).toBe(TaskStatuses.New);
    });

test('title of specified task should be changed',()=>{

    const action = updateTaskAC(toDoListID_2,  '2', {title: 'protein'} );
    const endState = taskReduser(startState, action)
    expect(endState[toDoListID_2][1].title).toBe('protein');
    expect(endState[toDoListID_1][1].status).toBe(TaskStatuses.New);
})


test('new array should be added when new todolist is added', () => {
let toDoListID_3 : string = v1();

    const action = AddToDoListAT("new todolist", toDoListID_3);
    const endState = taskReduser(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != toDoListID_1 && k != toDoListID_2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {


    const action = RemoveToDoListAT(toDoListID_2);

    const endState = taskReduser(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[toDoListID_2]).not.toBeDefined();
});






