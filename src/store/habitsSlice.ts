import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { Habit } from '../components/Table/habits.model'
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
		addSuccessColor(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const wasAlreadyFinished = state[index].colors[0] === SUCCESS_FINISH_COLOR
			state[index].colors = addSuccessColor(state[index].colors)
			state[index].didChange = true

			// checking for new streaks
			const successStreakCount = colorCounter(state[index].colors, SUCCESS_STREAK_COLOR)
			const successCount = colorCounter(state[index].colors, SUCCESS_COLOR)
			const successFinishCount = colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)
			if (successFinishCount === 0) {
				if (successStreakCount === 0) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[index].previousArrays.push(state[index].colors)
						state[index].colors = [SUCCESS_STREAK_COLOR]
					}
				} else if (successStreakCount === 1) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						const redCount = colorCounter(state[index].colors, FAIL_COLOR)
						if (redCount === 0) {
							// if 0 fail upgrade to finish color directly
							state[index].previousArrays.push(state[index].colors)
							state[index].colors = [SUCCESS_FINISH_COLOR]
						} else {
							state[index].previousArrays.push(state[index].colors)
							state[index].colors = [SUCCESS_STREAK_COLOR, SUCCESS_STREAK_COLOR]
						}
					}
				} else if (successStreakCount === 2) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[index].previousArrays.push(state[index].colors)
						state[index].colors = [SUCCESS_FINISH_COLOR]
					}
				} else {
					console.log('success streak count not in boundaries, successStreakCount : ' + successStreakCount)
				}
			} else {
				//successfinishcount === 1 here
				const failCount = colorCounter(state[index].colors, FAIL_COLOR)
				if (successCount > failCount * 3) {
					state[index].previousArrays.push(state[index].colors)
					state[index].colors = [SUCCESS_FINISH_COLOR]
				}
			}

			//updating success and fail counters
			state[index].failCounter = colorCounter(state[index].colors, FAIL_COLOR)
			state[index].successCounter += 1

			//If needed moving habit into finished collection
			if (!wasAlreadyFinished && colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)) {
				state[index].didSwitchCollection = true
			} else {
				state[index].didSwitchCollection = false
			}
		},
		addFailColor(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const wasAlreadyFinished = state[index].colors[0] === SUCCESS_FINISH_COLOR
			state[index].colors = addFailColor(state[index].colors)
			state[index].didChange = true

			//checking for new streaks
			if (hasTooManyRedsConsecutive(state[index].colors) || hasTooManyReds(state[index].colors)) {
				const successFinishCount = colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)
				if (successFinishCount === 1) {
					state[index].previousArrays.push(state[index].colors)
					state[index].colors = [SUCCESS_STREAK_COLOR]
				} else {
					state[index].previousArrays.push(state[index].colors)
					state[index].colors = [FAIL_STREAK_COLOR]
				}
			}

			// updating success and fail counters
			state[index].successCounter = calculateSuccessCount(state[index].colors, state[index].successCounter)
			state[index].failCounter += 1

			//If needed moving habit into finished collection
			if (wasAlreadyFinished && !colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)) {
				state[index].didSwitchCollection = true
			} else {
				state[index].didSwitchCollection = false
			}
		},
		clearColors(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const wasAlreadyFinished = state[index].colors[0] === SUCCESS_FINISH_COLOR

			state[index].colors = []
			state[index].successCounter = 0
			state[index].failCounter = 0
			state[index].previousArrays = []
			state[index].didSwitchCollection = false

			//If needed moving habit into finished collection
			if(wasAlreadyFinished) {
				state[index].didSwitchCollection = true
			} else {
				state[index].didSwitchCollection = false
			}
		},
		undoColors(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload
			const wasAlreadyFinished = state[index].colors[0] === SUCCESS_FINISH_COLOR
			state[index].didChange = false

			const previousArrays = state[index].previousArrays
			const colors = state[index].colors

			// updating success and fail counters
			if (previousArrays.length > 0 && previousArrays[previousArrays.length - 1][0] === SUCCESS_FINISH_COLOR) {
				state[index].successCounter = 25
				state[index].failCounter = colorCounter(previousArrays[previousArrays.length - 1], FAIL_COLOR)
			} else {
				const previousArray = previousArrays[previousArrays.length - 1]
				const lastColor = colors[colors.length - 1]
				switch (lastColor) {
					case SUCCESS_COLOR:
						state[index].successCounter -= 1
						break
					case FAIL_COLOR:
						state[index].failCounter -= 1
						break
					case SUCCESS_STREAK_COLOR:
						state[index].successCounter -= 1
						state[index].failCounter = colorCounter(previousArray, FAIL_COLOR)
						break
					case FAIL_STREAK_COLOR:
						state[index].failCounter -= 1
						state[index].successCounter = calculateSuccessCount(previousArray, state[index].successCounter)
						break
					case SUCCESS_FINISH_COLOR:
						state[index].successCounter -= 1
						state[index].failCounter = colorCounter(previousArray, FAIL_COLOR)
						break
				}
			}

			//updating colors
			const lastIndex = colors.length - 1
			if (
				colors[lastIndex] === SUCCESS_STREAK_COLOR ||
				colors[lastIndex] === FAIL_STREAK_COLOR ||
				colors[lastIndex] === SUCCESS_FINISH_COLOR
			) {
				if (previousArrays.length > 0) {
					const previousArray = previousArrays[previousArrays.length - 1]

					//updating previousArrays
					state[index].previousArrays.pop()

					previousArray.pop()
					state[index].colors = previousArray
				}
			} else {
				state[index].colors.pop()
			}

			//moving to the coresponding collection if needed
			if(!wasAlreadyFinished){
				if(colorCounter(state[index].colors, SUCCESS_FINISH_COLOR)){
					state[index].didSwitchCollection = true
				} else {
					state[index].didSwitchCollection = false
				}
			} else {
				if(colorCounter(state[index].colors, SUCCESS_FINISH_COLOR) === 0){
					state[index].didSwitchCollection = true
				} else {
					state[index].didSwitchCollection = false
				}
			}
		},
	},
})


export const addSuccessAction = ( index: number ):  ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.addSuccessColor({index}))
		updateHabitFromThunk(getState, index)
	}
}

export const addFailAction = ( index: number ):  ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.addFailColor({index}))
		updateHabitFromThunk(getState, index)
	}
}

export const clearColorsAction = ( index: number ):  ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.clearColors({index}))
		updateHabitFromThunk(getState, index)
	}
}

export const undoColorsAction = ( index: number ): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.undoColors({index}))
		updateHabitFromThunk(getState, index)
	}
}

async function updateHabitFromThunk(getState: () => RootState, index: number) {
	const state = getState()
	const habit = state.habits[index]
	// we always put didChange false in the database
	const response = await updateHabit({...habit, didChange: false})
	console.log('update : ', response)
}

export const habitsActionsThunk = { addSuccessAction, addFailAction, clearColorsAction, undoColorsAction}

export default habitsSlice.reducer
export const habitsActions = habitsSlice.actions
