import { DayStatus, DerivedHabitState, Habit, StoredHabit } from '../components/Main/Table/habits.model'
import {
	DAYS_TO_VALIDATE_STEP,
	FAIL_COLOR,
	FAIL_STREAK_COLOR,
	SUCCESS_COLOR,
	SUCCESS_FINISH_COLOR,
	SUCCESS_STREAK_COLOR,
	UNKNOWN_COLOR,
} from '../consts/consts'
import { addFailColor, addSuccessColor } from './colorsAdd.service'
import { calculateSuccessCount, colorCounter, hasTooManyReds, hasTooManyRedsConsecutive } from './colorsChecks.service'
import { addDays } from './dates.service'

export type DayDisplayStatus = DayStatus | 'unknown' | 'pending' | 'none'

type StreakState = Pick<DerivedHabitState, 'colors' | 'successCounter' | 'failCounter'>

export function getDayStatus(habit: Pick<StoredHabit, 'createdOn' | 'log' | 'deletedOn'>, date: string, todayKey: string): DayDisplayStatus {
	const status = habit.log[date]
	if (status && date <= todayKey) {
		return status
	}
	// a deleted habit has no unknown days from its deletion day
	if (date < habit.createdOn || date > todayKey || (habit.deletedOn && date >= habit.deletedOn)) {
		return 'none'
	}
	return date === todayKey ? 'pending' : 'unknown'
}

// Oldest day of a habit : its creation or its oldest log entry
export function getEarliestDate(habit: Pick<StoredHabit, 'createdOn' | 'log'>) {
	return [habit.createdOn, ...Object.keys(habit.log)].sort()[0]
}

export function applySuccess(state: StreakState): StreakState {
	let colors = addSuccessColor(state.colors)

	// checking for new streaks
	const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
	const successCount = colorCounter(colors, SUCCESS_COLOR)
	const successFinishCount = colorCounter(colors, SUCCESS_FINISH_COLOR)
	if (successFinishCount === 0) {
		if (successStreakCount === 0) {
			if (successCount >= DAYS_TO_VALIDATE_STEP) {
				colors = [SUCCESS_STREAK_COLOR]
			}
		} else if (successStreakCount === 1) {
			if (successCount >= DAYS_TO_VALIDATE_STEP) {
				const redCount = colorCounter(colors, FAIL_COLOR)
				if (redCount === 0) {
					// if 0 fail upgrade to finish color directly
					colors = [SUCCESS_FINISH_COLOR]
				} else {
					colors = [SUCCESS_STREAK_COLOR, SUCCESS_STREAK_COLOR]
				}
			}
		} else if (successStreakCount === 2) {
			if (successCount >= DAYS_TO_VALIDATE_STEP) {
				colors = [SUCCESS_FINISH_COLOR]
			}
		} else {
			console.log('success streak count not in boundaries, successStreakCount : ' + successStreakCount)
		}
	} else {
		//successfinishcount === 1 here
		const failCount = colorCounter(colors, FAIL_COLOR)
		if (successCount > failCount * 3) {
			colors = [SUCCESS_FINISH_COLOR]
		}
	}

	//updating success and fail counters
	return {
		colors,
		failCounter: colorCounter(colors, FAIL_COLOR),
		successCounter: state.successCounter + 1,
	}
}

export function applyFail(state: StreakState): StreakState {
	let colors = addFailColor(state.colors)

	//checking for new streaks
	if (hasTooManyRedsConsecutive(colors) || hasTooManyReds(colors)) {
		const successFinishCount = colorCounter(colors, SUCCESS_FINISH_COLOR)
		if (successFinishCount === 1) {
			colors = [SUCCESS_STREAK_COLOR]
		} else {
			colors = [FAIL_STREAK_COLOR]
		}
	}

	// updating success and fail counters
	return {
		colors,
		successCounter: calculateSuccessCount(colors, state.successCounter),
		failCounter: state.failCounter + 1,
	}
}

// Replays the log from startDate to today through the streak rules
export function deriveHabitState(habit: StoredHabit, todayKey: string): DerivedHabitState {
	let state: StreakState = { colors: [], successCounter: 0, failCounter: 0 }
	let lifetimeSuccessCounter = 0
	let lifetimeFailCounter = 0

	const firstDate = habit.startDate > habit.createdOn ? habit.startDate : habit.createdOn
	for (let date = firstDate; date <= todayKey; date = addDays(date, 1)) {
		const status = getDayStatus(habit, date, todayKey)
		if (status === 'success') {
			state = applySuccess(state)
			lifetimeSuccessCounter++
		} else if (status === 'fail') {
			state = applyFail(state)
			lifetimeFailCounter++
		} else if (status === 'unknown') {
			state = { ...state, colors: [...state.colors, UNKNOWN_COLOR] }
		}
	}

	return { ...state, lifetimeSuccessCounter, lifetimeFailCounter }
}

// Builds a client habit from what the database sends (habits saved before the daily log start empty)
export function createHabitFromStored(raw: Partial<StoredHabit> & Pick<StoredHabit, 'name' | '_id'>, todayKey: string): Habit {
	const createdOn = raw.createdOn ?? todayKey
	const stored: StoredHabit = {
		name: raw.name,
		_id: raw._id,
		createdOn,
		startDate: raw.startDate ?? createdOn,
		log: raw.log ?? {},
		...(raw.deletedOn && { deletedOn: raw.deletedOn }),
	}
	return { ...stored, ...deriveHabitState(stored, todayKey), history: [], historyStep: 0 }
}

// Only these fields are saved in the database
export function toStoredHabit(habit: StoredHabit): StoredHabit {
	const { name, _id, createdOn, startDate, log, deletedOn } = habit
	return { name, _id, createdOn, startDate, log, ...(deletedOn && { deletedOn }) }
}
