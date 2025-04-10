import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
const rootReducer = combineReducers({})

const persistConfig = {
    key: 'root',
    storage: localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { store, persistor }