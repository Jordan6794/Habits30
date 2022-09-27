export interface Habit {
	name: string
	_id: string
	colors: Array<string>
	successCounter: number
	failCounter: number
	lifetimeSuccessCounter: number
	lifetimeFailCounter: number
    history: Array<HistoryObject>
    historyStep: number
}

export interface HistoryObject {
    colors: Array<string>
    successCounter: number
	failCounter: number
	lifetimeSuccessCounter: number
	lifetimeFailCounter: number
}

// mock habit for tests
export const mockHabit = {
	name: 'Test Example',
	_id: 'test_id',
	colors: [],
	successCounter: 0,
	failCounter: 0,
	lifetimeSuccessCounter: 0,
	lifetimeFailCounter: 0,
	history: [],
	historyStep: 0
}