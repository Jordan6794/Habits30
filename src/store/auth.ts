import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../components/user.model'

const authInitialState: User | null = null

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            return action.payload
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions