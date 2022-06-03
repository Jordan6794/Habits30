import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Habit } from '../components/Table/habits.model'
import { addFailColor, addSuccessColor } from '../services/colorsAdd.service'
import { DAYS_TO_VALIDATE_STEP, FAIL_COLOR, FAIL_STREAK_COLOR, SUCCESS_COLOR, SUCCESS_FINISH_COLOR, SUCCESS_STREAK_COLOR } from '../consts/consts'
import { colorCounter, hasTooManyReds, hasTooManyRedsConsecutive } from '../services/colorsChecks.service'

const initialHabits: Habit[] = []

const habitsSlice = createSlice({
	name: 'habits',
	initialState: initialHabits,
	reducers: {
		set(state, action: PayloadAction<Habit[]>) {
			return action.payload
		},
		add(state, action: PayloadAction<Habit>) {
			state.push(action.payload)
		},
		delete(state, action: PayloadAction<number>) {
			return state.filter((_, index) => index !== action.payload)
		},
		addSuccessColor(state, action: PayloadAction<number>) {
			state[action.payload].colors = addSuccessColor(state[action.payload].colors)

			// checking for new streaks
			const successStreakCount = colorCounter(state[action.payload].colors, SUCCESS_STREAK_COLOR)
			const successCount = colorCounter(state[action.payload].colors, SUCCESS_COLOR)
			const successFinishCount = colorCounter(state[action.payload].colors, SUCCESS_FINISH_COLOR)
			if (successFinishCount === 0) {
				if (successStreakCount === 0) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[action.payload].previousArrays.push(state[action.payload].colors)
						state[action.payload].colors = [SUCCESS_STREAK_COLOR]
					}
				} else if (successStreakCount === 1) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						const redCount = colorCounter(state[action.payload].colors, FAIL_COLOR)
						if (redCount === 0) {
							// if 0 fail upgrade to finish color directly
							state[action.payload].previousArrays.push(state[action.payload].colors)
							state[action.payload].colors = [SUCCESS_FINISH_COLOR]
						} else {
							state[action.payload].previousArrays.push(state[action.payload].colors)
							state[action.payload].colors = [SUCCESS_STREAK_COLOR, SUCCESS_STREAK_COLOR]
						}
					}
				} else if (successStreakCount === 2) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[action.payload].previousArrays.push(state[action.payload].colors)
						state[action.payload].colors = [SUCCESS_FINISH_COLOR]
					}
				} else {
					console.log('success streak count not in boundaries, successStreakCount : ' + successStreakCount)
				}
			} else {
				const failCount = colorCounter(state[action.payload].colors, FAIL_COLOR)
				if (successCount > failCount * 3) {
					state[action.payload].previousArrays.push(state[action.payload].colors)
					state[action.payload].colors = [SUCCESS_FINISH_COLOR]
				}
			}

			//updating success and fail counters
			state[action.payload].failCounter = colorCounter(state[action.payload].colors, FAIL_COLOR)
			state[action.payload].successCounter += 1
		},
		addFailColor(state, action: PayloadAction<number>) {
			state[action.payload].colors = addFailColor(state[action.payload].colors)

			//checking for new streaks
			if (hasTooManyRedsConsecutive(state[action.payload].colors) || hasTooManyReds(state[action.payload].colors)) {
				const successFinishCount = colorCounter(state[action.payload].colors, SUCCESS_FINISH_COLOR)
				if (successFinishCount === 1) {
					state[action.payload].previousArrays.push(state[action.payload].colors)
					state[action.payload].colors = [SUCCESS_STREAK_COLOR]
				} else {
					state[action.payload].previousArrays.push(state[action.payload].colors)
					state[action.payload].colors = [FAIL_STREAK_COLOR]
				}
			}

			// updating success and fail counters
			//! remove duplicate definition calculateSuccessCount ? (need to access state and action.payload)
			function calculateSuccessCount(colors: string[]) {
				if (colorCounter(colors, SUCCESS_FINISH_COLOR) === 1) {
					return state[action.payload].successCounter
				} else if (colorCounter(colors, SUCCESS_STREAK_COLOR) === 0) {
					return colorCounter(colors, SUCCESS_COLOR)
				} else {
					const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
					const successCount = colorCounter(colors, SUCCESS_COLOR)
					return successStreakCount * DAYS_TO_VALIDATE_STEP + successCount
				}
			}
			state[action.payload].successCounter = calculateSuccessCount(state[action.payload].colors)
			state[action.payload].failCounter += 1
		},
		clearColors(state, action: PayloadAction<number>) {
			state[action.payload].colors = []
			state[action.payload].successCounter = 0
			state[action.payload].failCounter = 0
			state[action.payload].previousArrays = []
		},
		undoColors(state, action: PayloadAction<number>) {
			const previousArrays = state[action.payload].previousArrays
			const colors = state[action.payload].colors

			// updating success and fail counters
			if (previousArrays.length > 0 && previousArrays[previousArrays.length - 1][0] === SUCCESS_FINISH_COLOR) {
				state[action.payload].successCounter = 25
				state[action.payload].failCounter = colorCounter(previousArrays[previousArrays.length - 1], FAIL_COLOR)
			} else {
				const previousArray = previousArrays[previousArrays.length - 1]
				const lastColor = colors[colors.length - 1]
				switch (lastColor) {
					case SUCCESS_COLOR:
						state[action.payload].successCounter -= 1
						break
					case FAIL_COLOR:
						state[action.payload].failCounter -= 1
						break
					case SUCCESS_STREAK_COLOR:
						state[action.payload].successCounter -= 1
						state[action.payload].failCounter = colorCounter(previousArray, FAIL_COLOR)
						break
					case FAIL_STREAK_COLOR:
						state[action.payload].failCounter -= 1
						state[action.payload].successCounter = calculateSuccessCount(previousArray)
						break
					case SUCCESS_FINISH_COLOR:
						state[action.payload].successCounter -= 1
						state[action.payload].failCounter = colorCounter(previousArray, FAIL_COLOR)
						break
				}
			}

			//! remove duplicate definition calculateSuccessCount ? (need to access state and action.payload)
			function calculateSuccessCount(colors: string[]) {
				if (colorCounter(colors, SUCCESS_FINISH_COLOR) === 1) {
					return state[action.payload].successCounter
				} else if (colorCounter(colors, SUCCESS_STREAK_COLOR) === 0) {
					return colorCounter(colors, SUCCESS_COLOR)
				} else {
					const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
					const successCount = colorCounter(colors, SUCCESS_COLOR)
					return successStreakCount * DAYS_TO_VALIDATE_STEP + successCount
				}
			}

			//updating colors
			const lastIndex = colors.length - 1
			if (colors[lastIndex] === SUCCESS_STREAK_COLOR || colors[lastIndex] === FAIL_STREAK_COLOR || colors[lastIndex] === SUCCESS_FINISH_COLOR) {
				if (previousArrays.length > 0) {
					const previousArray = previousArrays[previousArrays.length - 1]

                    //updating previousArrays
                    //! replace by pop()?
					state[action.payload].previousArrays = previousArrays.filter((array, index) => {
						return index !== previousArrays.length - 1
					})

                    //! replace by pop()?
					state[action.payload].colors = previousArray.filter((colors, index) => {
						const lastPreviousIndex = previousArray.length - 1
						return index !== lastPreviousIndex
					})
				} 
			} else {
                //! replace by pop()?
				state[action.payload].colors = colors.filter((prevValue, index) => {
					return index !== lastIndex
				})
			}
		},
	},
})

export default habitsSlice.reducer
export const habitsActions = habitsSlice.actions
