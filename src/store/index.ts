import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from './habits'
import authReducer from './auth'


const store = configureStore({
    reducer: {
        habits: habitsReducer,
        auth: authReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch