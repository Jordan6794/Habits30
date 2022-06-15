import {
	DAYS_TO_VALIDATE_STEP,
	MAX_CONSECUTIVE_RED_NUMBER,
	MAX_CONSECUTIVE_RED_NUMBER_WHILE_GREEN_STREAK,
    SUCCESS_COLOR,
    SUCCESS_FINISH_COLOR,
    SUCCESS_STREAK_COLOR,
    TOO_MANY_REDS_NUMBER,
    TOO_MANY_REDS_NUMBER_WHILE_GREEN_STREAK
} from '../consts/consts'

export function hasTooManyRedsConsecutive(array: string[]) {
	const dgCount = colorCounter(array, 'dg')
	const fgCount = colorCounter(array, 'f')
	let maxConsecutiveNumber = MAX_CONSECUTIVE_RED_NUMBER
	if (dgCount >= 2 || fgCount === 1) {
		maxConsecutiveNumber = MAX_CONSECUTIVE_RED_NUMBER_WHILE_GREEN_STREAK
	}

	let previous = null
	let count = 0
	for (let i = 0; i < array.length; i++) {
		if (array[i] !== previous) {
			previous = array[i]
			count = 0
		}
		count += 1
		if (maxConsecutiveNumber <= count) {
			if (array[i] === 'r' || array[i] === 'dr') {
				return true
			}
		}
	}
	return false
}

export function hasTooManyReds(array: string[]) {
	const dgCount = colorCounter(array, 'dg')
	const fgCount = colorCounter(array, 'f')
	const redCount = colorCounter(array, 'r')

	if (dgCount < 2 && fgCount === 0) {
		if (redCount >= TOO_MANY_REDS_NUMBER) {
			return true
		} else {
			return false
		}
	} else {
		if (redCount >= TOO_MANY_REDS_NUMBER_WHILE_GREEN_STREAK) {
			return true
		} else {
			return false
		}
	}
}

export function colorCounter(array: string[], color: string) {
	let counter = 0
	for (let i = 0; i < array?.length; i++) {
		if (array[i] === color) {
			counter++
		}
	}
	return counter
}

export function calculateSuccessCount(colors: string[], successCounter: number) {
	if (colorCounter(colors, SUCCESS_FINISH_COLOR) === 1) {
		return successCounter
	} else if (colorCounter(colors, SUCCESS_STREAK_COLOR) === 0) {
		return colorCounter(colors, SUCCESS_COLOR)
	} else {
		const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
		const successCount = colorCounter(colors, SUCCESS_COLOR)
		return successStreakCount * DAYS_TO_VALIDATE_STEP + successCount
	}
}