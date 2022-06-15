import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from './habitsSlice'
import authReducer from './authSlice'


const store = configureStore({
    reducer: {
        habits: habitsReducer,
        auth: authReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch