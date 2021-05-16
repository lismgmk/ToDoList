import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReduser} from './taskReduser';
import {TasksStateType, ToDoListType} from '../AppWithRedux';
import {AddToDoListAT, RemoveToDoListAT} from "./toDoListReduser";
// import {AddToDoListAT, RemoveToDoListAT} from "./toDoListReduser";

let startState: TasksStateType

beforeEach(()=>{
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {



    const action = removeTaskAC("2", "todolistId2");

    const endState = taskReduser(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });
});



test('correct task should be added to correct array', () => {


    const action = addTaskAC("juce", "todolistId2");

    const endState = taskReduser(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC('2',  false, "todolistId2", );

    const endState = taskReduser(startState, action)

    expect(endState["todolistId2"][2].isDone).toBe(false);
    expect(endState["todolistId1"][2].isDone).toBe(false);
});

test('title of specified task should be changed',()=>{


    const action = changeTaskTitleAC('2',  "proptein", "todolistId2", );

    const endState = taskReduser(startState, action)

    expect(endState[action.toDoListId][1].title).toBe("proptein")
    expect(endState[action.toDoListId][1].isDone).toBeTruthy()
})


test('new array should be added when new todolist is added', () => {


    const action = AddToDoListAT("new todolist");

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






