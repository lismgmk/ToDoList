import {appReducer, InitialStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reduser";


let startState: InitialStateType

beforeEach(()=>{
    startState = {
        status: 'loading' as RequestStatusType,
        error: null as string | null
    }
})


test('correct task should be change status', () => {
    const action = setAppStatusAC('succeeded');
    const endState =  appReducer(startState, action)
    expect(endState.status).toBe('succeeded');
});


test('correct task should be change error', () => {
    const action = setAppErrorAC('error');
    const endState =  appReducer(startState, action)
    expect(endState.error).toBe('error');
});







