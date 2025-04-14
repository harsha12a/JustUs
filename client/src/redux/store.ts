import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from './slices/userSlice.ts'
import chatReducer from './slices/chatSlice.ts'
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { store, persistor }