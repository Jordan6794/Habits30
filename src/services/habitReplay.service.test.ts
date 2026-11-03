import { DayStatus, StoredHabit } from '../components/Main/Table/habits.model'
import { FAIL_STREAK_COLOR, SUCCESS_COLOR, SUCCESS_STREAK_COLOR, UNKNOWN_COLOR } from '../consts/consts'
import { addDays } from './dates.service'
import { deriveHabitState, getDayStatus } from './habitReplay.service'

// builds a habit whose log follows the given days ('s' success, 'f' fail, 'u' no result) starting on startDate
function makeHabit(days: string, startDate = '2026-11-01'): StoredHabit {
	const log: Record<string, DayStatus> = {}
	days.split('').forEach((day, i) => {
		if (day === 's') log[addDays(startDate, i)] = 'success'
		if (day === 'f') log[addDays(startDate, i)] = 'fail'
	})
	return { name: 'test', _id: 'id', createdOn: startDate, startDate, log }
}

describe('Habit replay', () => {
	test('10 consecutive successes make a success streak', () => {
		const habit = makeHabit('ssssssssss')
		expect(deriveHabitState(habit, '2026-11-10').colors).toEqual([SUCCESS_STREAK_COLOR])
	})

	test('days without result become unknown cells', () => {
		const habit = makeHabit('sus')
		expect(deriveHabitState(habit, '2026-11-03').colors).toEqual([SUCCESS_COLOR, UNKNOWN_COLOR, SUCCESS_COLOR])
	})

	test('unknown days are neutral : two fails around an unknown still count as consecutive', () => {
		const habit = makeHabit('fuf')
		expect(deriveHabitState(habit, '2026-11-03').colors).toEqual([FAIL_STREAK_COLOR])
	})

	test('today without result is pending and adds no cell', () => {
		const habit = makeHabit('s')
		expect(deriveHabitState(habit, '2026-11-02').colors).toEqual([SUCCESS_COLOR])
		expect(deriveHabitState(habit, '2026-11-03').colors).toEqual([SUCCESS_COLOR, UNKNOWN_COLOR])
		expect(getDayStatus(habit, '2026-11-02', '2026-11-02')).toBe('pending')
	})

	test('lifetime counters only count from the start date', () => {
		const habit = { ...makeHabit('ssfs'), startDate: '2026-11-03' }
		const state = deriveHabitState(habit, '2026-11-04')
		expect(state.lifetimeSuccessCounter).toBe(1)
		expect(state.lifetimeFailCounter).toBe(1)
	})

	test('getDayStatus gives the status of any day', () => {
		const habit = makeHabit('sfu')
		expect(getDayStatus(habit, '2026-10-31', '2026-11-04')).toBe('none')
		expect(getDayStatus(habit, '2026-11-01', '2026-11-04')).toBe('success')
		expect(getDayStatus(habit, '2026-11-02', '2026-11-04')).toBe('fail')
		expect(getDayStatus(habit, '2026-11-03', '2026-11-04')).toBe('unknown')
		expect(getDayStatus(habit, '2026-11-05', '2026-11-04')).toBe('none')
	})
})
