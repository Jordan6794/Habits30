import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from './habitsSlice'
import authReducer from './authSlice'
import loadingReducer from './loadingSlice'


const store = configureStore({
    reducer: {
        habits: habitsReducer,
        auth: authReducer,
        loading: loadingReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch