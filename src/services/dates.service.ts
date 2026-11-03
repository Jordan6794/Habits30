import { DAY_END_HOUR, DAY_END_MINUTE } from '../consts/consts'

// Dates are stored as local calendar strings 'YYYY-MM-DD'

export function toDateKey(date: Date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

// Using noon so a 23h or 25h DST day can never shift the result to the wrong date
export function addDays(dateKey: string, days: number) {
	const [year, month, day] = dateKey.split('-').map(Number)
	return toDateKey(new Date(year, month - 1, day + days, 12))
}

// Before DAY_END_HOUR:DAY_END_MINUTE we are still on the previous habit day
export function getTodayKey(now: Date = new Date()) {
	const minutes = now.getHours() * 60 + now.getMinutes()
	const today = toDateKey(now)
	if (minutes < DAY_END_HOUR * 60 + DAY_END_MINUTE) {
		return addDays(today, -1)
	}
	return today
}

// Months are 'YYYY-MM' strings
export function getMonthKey(dateKey: string) {
	return dateKey.slice(0, 7)
}

export function addMonths(monthKey: string, months: number) {
	const [year, month] = monthKey.split('-').map(Number)
	return getMonthKey(toDateKey(new Date(year, month - 1 + months, 1, 12)))
}

// All the date keys of a month, from the 1st to the last day
export function getMonthDateKeys(monthKey: string) {
	const [year, month] = monthKey.split('-').map(Number)
	const numberOfDays = new Date(year, month, 0).getDate()
	return Array.from({ length: numberOfDays }, (_, i) => `${monthKey}-${String(i + 1).padStart(2, '0')}`)
}

// 0 for monday, 6 for sunday
export function getWeekDayIndex(dateKey: string) {
	const [year, month, day] = dateKey.split('-').map(Number)
	return (new Date(year, month - 1, day, 12).getDay() + 6) % 7
}

export function formatMonth(monthKey: string) {
	const [year, month] = monthKey.split('-').map(Number)
	return new Date(year, month - 1, 1, 12).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
