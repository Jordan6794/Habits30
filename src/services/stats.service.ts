import { Habit } from '../components/Main/Table/habits.model'
import { SUCCESS_STREAK_COLOR, SUCCESS_FINISH_COLOR, FAIL_STREAK_COLOR } from '../consts/consts'

export function calculateTotalSuccesses(habits: Habit[]) {
	let count = 0
	habits.forEach((habit) => (count += habit.successCounter))
	return count
}

export function calculateTotalFails(habits: Habit[]) {
	let count = 0
	habits.forEach((habit) => (count += habit.failCounter))
	return count
}

export function calculateSuccessesFailRatio(habits: Habit[]) {
	const successes = calculateTotalSuccesses(habits)
	const fails = calculateTotalFails(habits)
	return Math.round((successes / (successes + fails)) * 100)
}

export function calculateMostSuccessfulHabit(habits: Habit[]) {
	let mostSuccessfulCount = 0
	habits.forEach((habit) => {
		if (habit.successCounter > mostSuccessfulCount) {
			mostSuccessfulCount = habit.successCounter
		}
	})
	return mostSuccessfulCount
}

export function calculateStreakedHabits(habits: Habit[], streak: string) {
	let streakedHabits = habits.filter((habit) => habit.colors[0] === streak)
	return streakedHabits.length
}

export function calculateNonStreakedHabits(habits: Habit[]) {
	let nonStreakedHabits = habits.filter(
		(habit) =>
			habit.colors[0] !== SUCCESS_STREAK_COLOR && habit.colors[0] !== SUCCESS_FINISH_COLOR && habit.colors[0] !== FAIL_STREAK_COLOR
	)
    return nonStreakedHabits.length
}

// export function calculateLongestHabit(habits: Habit[]){
//     let longestHabitDuration = 0
//     habits.forEach(habit => {
//         const duration = habit.failCounter + habit.successCounter
//         if(duration > longestHabitDuration){longestHabitDuration = duration}
//     })
//     return longestHabitDuration
// }

export function calculateSmallestSuccessesHabit(habits: Habit[]){
    if(habits.length === 0){ return 0}
    const smallestWins = habits.reduce((accumulator, habit) => {
        if(habit.successCounter < accumulator){
            return habit.successCounter
        } else {
            return accumulator
        }
    }, habits[0].successCounter)
    return smallestWins
}

export function calculateMostSuccessesHabit(habits: Habit[]){
    let mostSuccesses = 0
    habits.forEach(habit => {
        if(habit.successCounter > mostSuccesses){mostSuccesses = habit.successCounter}
    })
    return mostSuccesses
}

export function calculateAverageSuccesses(habits: Habit[]){
    const successes = habits.map(habit => habit.successCounter)
    const sum = successes.reduce((accumulator, element) => (accumulator + element), 0)
    const average = sum / habits.length
    return average.toFixed(2)
}