import { createSlice } from "@reduxjs/toolkit"; 

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        message: []
    },
    reducers: {
        getMessages: (state, action) => {
            state.message = action.payload
        }
    }
})

export const { getMessages } = messageSlice.actions
export default messageSlice.reducer