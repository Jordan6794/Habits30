export type DayStatus = 'success' | 'fail'

// What is saved in the database, everything else is derived from the log
export interface StoredHabit {
	name: string
	_id: string
	createdOn: string // 'YYYY-MM-DD'
	startDate: string // replay starts here, moved to today on clear
	log: Record<string, DayStatus> // key 'YYYY-MM-DD'
	deletedOn?: string // 'YYYY-MM-DD', deleted habits are hidden but their logs still count in the stats
	isFavorite?: boolean // only stored when true, missing (older habits) means not favorite
}

export interface DerivedHabitState {
	colors: Array<string>
	successCounter: number
	failCounter: number
	lifetimeSuccessCounter: number
	lifetimeFailCounter: number
}

export interface Habit extends StoredHabit, DerivedHabitState {
	// session only undo/redo, never saved in the database
	history: Array<HistoryObject>
	historyStep: number
}

export interface HistoryObject {
	startDate: string
	log: Record<string, DayStatus>
}

// mock habit for tests
export const mockHabit: Habit = {
	name: 'Test Example',
	_id: 'test_id',
	createdOn: '2026-11-01',
	startDate: '2026-11-01',
	log: {},
	colors: [],
	successCounter: 0,
	failCounter: 0,
	lifetimeSuccessCounter: 0,
	lifetimeFailCounter: 0,
	history: [],
	historyStep: 0,
}
