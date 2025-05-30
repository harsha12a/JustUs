import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat: (state, action) => {
            state.chat = action.payload
        }
    }
})

export const { setChat } = chatSlice.actions
export default chatSlice.reducer