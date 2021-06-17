import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReduser} from './taskReduser';
import {TasksStateType, ToDoListType} from '../AppWithRedux';
import {AddToDoListAT, RemoveToDoListAT} from "./toDoListReduser";


let startState: TasksStateType

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

beforeEach(()=>{


    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", completed: false, ...elseParam},
            {id: "2", title: "JS", completed: true, ...elseParam},
            {id: "3", title: "React", completed: false, ...elseParam}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false, ...elseParam},
            {id: "2", title: "milk", completed: true, ...elseParam},
            {id: "3", title: "tea", completed: false, ...elseParam}
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2");

    const endState = taskReduser(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", completed: false, ...elseParam},
            {id: "2", title: "JS", completed: true, ...elseParam},
            {id: "3", title: "React", completed: false, ...elseParam}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false, ...elseParam},
            {id: "3", title: "tea", completed: false, ...elseParam}
        ]
    });
});



test('correct task should be added to correct array', () => {

    const task = {id: "4", title: "juce", completed: false, ...elseParam, todoListId: "todolistId2"}

    const action = addTaskAC(task);

    const endState = taskReduser(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][3].title).toBe("juce");
    expect(endState["todolistId2"][3].completed).toBe(false);
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC('2',  false, "todolistId2", );

    const endState = taskReduser(startState, action)

    expect(endState["todolistId2"][2].completed).toBe(false);
    expect(endState["todolistId1"][2].completed).toBe(false);
});

test('title of specified task should be changed',()=>{


    const action = changeTaskTitleAC('2',  "proptein", "todolistId2", );

    const endState = taskReduser(startState, action)

    expect(endState[action.toDoListId][1].title).toBe("proptein")
    expect(endState[action.toDoListId][1].completed).toBeTruthy()
})


test('new array should be added when new todolist is added', () => {


    const action = AddToDoListAT("new todolist", 'todolistId3');

    const endState = taskReduser(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {


    const action = RemoveToDoListAT("todolistId2");

    const endState = taskReduser(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});






