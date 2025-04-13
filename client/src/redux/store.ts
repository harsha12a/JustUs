import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { persistReducer, persistStore } from 'redux-persist'
import userReducer from './slices/userSlice.ts'
const rootReducer = combineReducers({
    user: userReducer,
})

// const persistConfig = {
//     key: 'root',
//     storage: localStorage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: rootReducer
})

// const persistor = persistStore(store)

export { store }