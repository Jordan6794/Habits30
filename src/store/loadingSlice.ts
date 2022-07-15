import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialLoadingState = false

const loadingSlice = createSlice({
	name: 'loading',
	initialState: initialLoadingState,
	reducers: {
		set(state, action: PayloadAction<boolean>) {
			return action.payload
		},
	},
})

export default loadingSlice.reducer
export const loadingActions = loadingSlice.actions