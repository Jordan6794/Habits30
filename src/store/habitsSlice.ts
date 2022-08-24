import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { Habit, HistoryObject } from '../components/Main/Table/habits.model'
import { addFailColor, addSuccessColor } from '../services/colorsAdd.service'
import {
	DAYS_TO_VALIDATE_STEP,
	FAIL_COLOR,
	FAIL_STREAK_COLOR,
	SUCCESS_COLOR,
	SUCCESS_FINISH_COLOR,
	SUCCESS_STREAK_COLOR,
} from '../consts/consts'
import { calculateSuccessCount, colorCounter, hasTooManyReds, hasTooManyRedsConsecutive } from '../services/colorsChecks.service'
import { updateHabit } from '../actions/habits'
import { RootState } from '.'

const initialHabits: Habit[] = []
// record string habit

const habitsSlice = createSlice({
	name: 'habits',
	initialState: initialHabits,
	reducers: {
		set(state, action: PayloadAction<{ habits: Habit[] }>) {
			return action.payload.habits
		},
		add(state, action: PayloadAction<{ habit: Habit }>) {
			state.push(action.payload.habit)
		},
		delete(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			state.splice(index, 1)
		},
		updateName(state, action: PayloadAction<{index: number, newName: string}>){
			const { index, newName } = action.payload
			state[index].name = newName
		},
		addSuccessColor(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const habit = state[index]

			//If we did undo already we drop the history
			if(habit.historyStep !== habit.history.length){
				state[index].history = []
				state[index].historyStep = 0
			}
			const { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter} = habit
			const historyObject: HistoryObject = { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter }
			state[index].history.push(historyObject)
			state[index].historyStep++

			state[index].colors = addSuccessColor(state[index].colors)
			state[index].didChange = true

			// checking for new streaks
			const successStreakCount = colorCounter(state[index].colors, SUCCESS_STREAK_COLOR)
			const successCount = colorCounter(state[index].colors, SUCCESS_COLOR)
			const successFinishCount = colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)
			if (successFinishCount === 0) {
				if (successStreakCount === 0) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[index].colors = [SUCCESS_STREAK_COLOR]
					}
				} else if (successStreakCount === 1) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						const redCount = colorCounter(state[index].colors, FAIL_COLOR)
						if (redCount === 0) {
							// if 0 fail upgrade to finish color directly
							state[index].colors = [SUCCESS_FINISH_COLOR]
						} else {
							state[index].colors = [SUCCESS_STREAK_COLOR, SUCCESS_STREAK_COLOR]
						}
					}
				} else if (successStreakCount === 2) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[index].colors = [SUCCESS_FINISH_COLOR]
					}
				} else {
					console.log('success streak count not in boundaries, successStreakCount : ' + successStreakCount)
				}
			} else {
				//successfinishcount === 1 here
				const failCount = colorCounter(state[index].colors, FAIL_COLOR)
				if (successCount > failCount * 3) {
					state[index].colors = [SUCCESS_FINISH_COLOR]
				}
			}

			//updating success and fail counters
			state[index].failCounter = colorCounter(state[index].colors, FAIL_COLOR)
			state[index].successCounter += 1
			state[index].lifetimeSuccessCounter += 1
		},
		addFailColor(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const habit = state[index]

			//If we did undo already we drop the history
			if(habit.historyStep !== habit.history.length){
				state[index].history = []
				state[index].historyStep = 0
			}
			const { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter} = habit
			const historyObject: HistoryObject = { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter }
			state[index].history.push(historyObject)
			state[index].historyStep++
			state[index].colors = addFailColor(state[index].colors)
			state[index].didChange = true

			//checking for new streaks
			if (hasTooManyRedsConsecutive(state[index].colors) || hasTooManyReds(state[index].colors)) {
				const successFinishCount = colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)
				if (successFinishCount === 1) {
					state[index].colors = [SUCCESS_STREAK_COLOR]
				} else {
					state[index].colors = [FAIL_STREAK_COLOR]
				}
			}

			// updating success and fail counters
			state[index].successCounter = calculateSuccessCount(state[index].colors, state[index].successCounter)
			state[index].failCounter += 1
			state[index].lifetimeFailCounter += 1
		},
		clearColors(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const habit = state[index]

			//If we did undo already we drop the history
			if(habit.historyStep !== habit.history.length){
				state[index].history = []
				state[index].historyStep = 0
			}
			const { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter} = habit
			const historyObject: HistoryObject = { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter }
			state[index].history.push(historyObject)
			state[index].historyStep++

			state[index].colors = []
			state[index].successCounter = 0
			state[index].failCounter = 0
		},
		undoColors(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			state[index].didChange = false

			if(state[index].history.length === 0){
				return
			}
			const step = state[index].historyStep
			//If we're on the first undo we add the history into the array so we can redo to it
			if (step === state[index].history.length){
				const habit = state[index]
				const { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter} = habit
				const historyObject: HistoryObject = { colors, successCounter, failCounter, lifetimeSuccessCounter, lifetimeFailCounter }
				state[index].history.push(historyObject)
			}
			state[index] = {...state[index], ...state[index].history[step - 1]}
			state[index].historyStep--
		},
		redoColors(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			state[index].didChange = false

			const step = state[index].historyStep
			state[index] = {...state[index], ...state[index].history[step + 1]}
			state[index].historyStep++
		},
	},
})
export const updateNameAction = (index: number, newName: string): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.updateName({ index, newName }))
		updateHabitFromThunk(getState, index)
	}
}

export const addSuccessAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.addSuccessColor({ index }))
		updateHabitFromThunk(getState, index)
	}
}

export const addFailAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.addFailColor({ index }))
		updateHabitFromThunk(getState, index)
	}
}

export const clearColorsAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.clearColors({ index }))
		updateHabitFromThunk(getState, index)
	}
}

export const undoColorsAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.undoColors({ index }))
		updateHabitFromThunk(getState, index)
	}
}

export const redoColorsAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.redoColors({ index }))
		updateHabitFromThunk(getState, index)
	}
}

async function updateHabitFromThunk(getState: () => RootState, index: number) {
	const state = getState()
	const habit = state.habits[index]
	// we always put didChange false and history empty in the database
	const response = await updateHabit({ ...habit, didChange: false, history: [], historyStep: 0 })
	console.log('update : ', response)
}

export const habitsActionsThunk = { updateNameAction, addSuccessAction, addFailAction, clearColorsAction, undoColorsAction, redoColorsAction }

export default habitsSlice.reducer
export const habitsActions = habitsSlice.actions
