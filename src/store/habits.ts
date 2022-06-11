import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Habit } from '../components/Table/habits.model'
import { addFailColor, addSuccessColor } from '../services/colorsAdd.service'
import { DAYS_TO_VALIDATE_STEP, FAIL_COLOR, FAIL_STREAK_COLOR, SUCCESS_COLOR, SUCCESS_FINISH_COLOR, SUCCESS_STREAK_COLOR, Collection } from '../consts/consts'
import { colorCounter, hasTooManyReds, hasTooManyRedsConsecutive } from '../services/colorsChecks.service'

const initialHabits: {[Collection.Ongoing]: Habit[], [Collection.Finished]: Habit[]} = {[Collection.Ongoing]: [], [Collection.Finished]: []}

const habitsSlice = createSlice({
	name: 'habits',
	initialState: initialHabits,
	reducers: {
		set(state, action: PayloadAction<{habits: Habit[], collection: Collection}>) {
			state[action.payload.collection] = action.payload.habits
		},
		add(state, action: PayloadAction<{habit: Habit, collection: Collection}>) {
			state[action.payload.collection].push(action.payload.habit)
		},
		delete(state, action: PayloadAction<{index: number, collection: Collection}>) {
			const { collection , index} = action.payload
			state[collection].splice(index, 1)
		},
		addSuccessColor(state, action: PayloadAction<{index: number, collection: Collection}>) {
			const {collection, index } = action.payload
			state[collection][index].colors = addSuccessColor(state[collection][index].colors )
			state[collection][index].didChange = true

			// checking for new streaks
			const successStreakCount = colorCounter(state[collection][index].colors, SUCCESS_STREAK_COLOR)
			const successCount = colorCounter(state[collection][index].colors, SUCCESS_COLOR)
			const successFinishCount = colorCounter(state[collection][index].colors, SUCCESS_FINISH_COLOR)
			if (successFinishCount === 0) {
				if (successStreakCount === 0) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[collection][index].previousArrays.push(state[collection][index].colors)
						state[collection][index].colors = [SUCCESS_STREAK_COLOR]
					}
				} else if (successStreakCount === 1) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						const redCount = colorCounter(state[collection][index].colors, FAIL_COLOR)
						if (redCount === 0) {
							// if 0 fail upgrade to finish color directly
							state[collection][index].previousArrays.push(state[collection][index].colors)
							state[collection][index].colors = [SUCCESS_FINISH_COLOR]
						} else {
							state[collection][index].previousArrays.push(state[collection][index].colors)
							state[collection][index].colors = [SUCCESS_STREAK_COLOR, SUCCESS_STREAK_COLOR]
						}
					}
				} else if (successStreakCount === 2) {
					if (successCount >= DAYS_TO_VALIDATE_STEP) {
						state[collection][index].previousArrays.push(state[collection][index].colors)
						state[collection][index].colors = [SUCCESS_FINISH_COLOR]
					}
				} else {
					console.log('success streak count not in boundaries, successStreakCount : ' + successStreakCount)
				}
				
			} else { 
				//successfinishcount === 1 here
				const failCount = colorCounter(state[collection][index].colors, FAIL_COLOR)
				if (successCount > failCount * 3) {
					state[collection][index].previousArrays.push(state[collection][index].colors)
					state[collection][index].colors = [SUCCESS_FINISH_COLOR]
				}
			}

			//updating success and fail counters
			state[collection][index].failCounter = colorCounter(state[collection][index].colors, FAIL_COLOR)
			state[collection][index].successCounter += 1

			//If needed moving habit into finished collection
			if(collection === Collection.Ongoing){
				if(colorCounter(state[collection][index].colors, SUCCESS_FINISH_COLOR)){
					state[Collection.Ongoing][index].shouldSwitchCollection = true
				}
			}
		},
		addFailColor(state, action: PayloadAction<{index: number, collection: Collection}>) {
			const { index, collection } = action.payload
			state[collection][index].colors = addFailColor(state[collection][index].colors)
			state[collection][index].didChange = true

			//checking for new streaks
			if (hasTooManyRedsConsecutive(state[collection][index].colors) || hasTooManyReds(state[collection][index].colors)) {
				const successFinishCount = colorCounter(state[collection][index].colors, SUCCESS_FINISH_COLOR)
				if (successFinishCount === 1) {
					state[collection][index].previousArrays.push(state[collection][index].colors)
					state[collection][index].colors = [SUCCESS_STREAK_COLOR]
				} else {
					state[collection][index].previousArrays.push(state[collection][index].colors)
					state[collection][index].colors = [FAIL_STREAK_COLOR]
				}
			}

			// updating success and fail counters
			//! remove duplicate definition calculateSuccessCount ? (need to access state and action.payload)
			function calculateSuccessCount(colors: string[]) {
				if (colorCounter(colors, SUCCESS_FINISH_COLOR) === 1) {
					return state[collection][index].successCounter
				} else if (colorCounter(colors, SUCCESS_STREAK_COLOR) === 0) {
					return colorCounter(colors, SUCCESS_COLOR)
				} else {
					const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
					const successCount = colorCounter(colors, SUCCESS_COLOR)
					return successStreakCount * DAYS_TO_VALIDATE_STEP + successCount
				}
			}
			state[collection][index].successCounter = calculateSuccessCount(state[collection][index].colors)
			state[collection][index].failCounter += 1

			//If needed moving habit down into ongoing collection
			if(collection === Collection.Finished){
				if(colorCounter(state[collection][index].colors, SUCCESS_FINISH_COLOR) === 0){
					state[Collection.Finished][index].shouldSwitchCollection = true
				}
			}
		},
		clearColors(state, action: PayloadAction<{index: number, collection: Collection}>) {
			const { index, collection } = action.payload
			state[collection][index].colors = []
			state[collection][index].successCounter = 0
			state[collection][index].failCounter = 0
			state[collection][index].previousArrays = []
			state[collection][index].shouldSwitchCollection = false

			//move habit to current if it was finished
			if(collection === Collection.Finished){
				state[Collection.Finished][index].shouldSwitchCollection = true
			}
		},
		undoColors(state, action: PayloadAction<{index: number, collection: Collection}>) {
			const { index, collection } = action.payload
			state[collection][index].didChange = false
			
			const previousArrays = state[collection][index].previousArrays
			const colors = state[collection][index].colors

			// updating success and fail counters
			if (previousArrays.length > 0 && previousArrays[previousArrays.length - 1][0] === SUCCESS_FINISH_COLOR) {
				state[collection][index].successCounter = 25
				state[collection][index].failCounter = colorCounter(previousArrays[previousArrays.length - 1], FAIL_COLOR)
			} else {
				const previousArray = previousArrays[previousArrays.length - 1]
				const lastColor = colors[colors.length - 1]
				switch (lastColor) {
					case SUCCESS_COLOR:
						state[collection][index].successCounter -= 1
						break
					case FAIL_COLOR:
						state[collection][index].failCounter -= 1
						break
					case SUCCESS_STREAK_COLOR:
						state[collection][index].successCounter -= 1
						state[collection][index].failCounter = colorCounter(previousArray, FAIL_COLOR)
						break
					case FAIL_STREAK_COLOR:
						state[collection][index].failCounter -= 1
						state[collection][index].successCounter = calculateSuccessCount(previousArray)
						break
					case SUCCESS_FINISH_COLOR:
						state[collection][index].successCounter -= 1
						state[collection][index].failCounter = colorCounter(previousArray, FAIL_COLOR)
						break
				}
			}

			//! remove duplicate definition calculateSuccessCount ? (need to access state and action.payload)
			function calculateSuccessCount(colors: string[]) {
				if (colorCounter(colors, SUCCESS_FINISH_COLOR) === 1) {
					return state[collection][index].successCounter
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
					state[collection][index].previousArrays.pop()
					
					previousArray.pop()
					state[collection][index].colors = previousArray
				} 
			} else {
				state[collection][index].colors.pop()
			}

			//moving to the coresponding collection if needed
			if(collection === Collection.Ongoing){
				if(colorCounter(state[collection][index].colors, SUCCESS_FINISH_COLOR)){
					state[Collection.Ongoing][index].shouldSwitchCollection = true
				}
			} else if(collection === Collection.Finished){
				if(colorCounter(state[collection][index].colors, SUCCESS_FINISH_COLOR) === 0){
					state[Collection.Finished][index].shouldSwitchCollection = true
				}
			}
		},
		switchCollection(state, action: PayloadAction<{index: number, fromCollection: Collection, toCollection: Collection}>){
			const {index, fromCollection, toCollection} = action.payload
			state[fromCollection][index].shouldSwitchCollection = false
			state[toCollection].push(state[fromCollection][index])
			state[fromCollection].splice(index, 1)
		}
	},
})

export default habitsSlice.reducer
export const habitsActions = habitsSlice.actions
