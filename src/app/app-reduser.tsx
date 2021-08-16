import { createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export type InitialStateType = typeof initialState

const Slice = createSlice({
    name: 'AppSlice',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status : RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC (state, action: PayloadAction<{error : string | null}>) {
            state.error = action.payload.error
        },
    },
})
export const {setAppStatusAC, setAppErrorAC} = Slice.actions

export const appReducer = Slice.reducer




