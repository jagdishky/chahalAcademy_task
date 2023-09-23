import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: undefined,
}

export const USER_SLICE = createSlice({
    name: 'USER_SLICE',
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.isUserLoggedIn = action.payload.isUserLoggedIn
            return state
        },
        logout: (state) => {
            state = undefined
        }
    }
})

export const userRes = (state) => state.USER_SLICE;

export const { userDetails, logout } = USER_SLICE.actions;

export default USER_SLICE.reducer;