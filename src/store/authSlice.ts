import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../components/user.model'

interface UserState {
    user: User | null
}

const authInitialState: UserState = {user: null}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>){
            state.user = action.payload
        },
        onboard(state) {
            if(state.user){
                state.user.result.hasOnboarded = true
            }
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions