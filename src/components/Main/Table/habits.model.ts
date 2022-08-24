export interface Habit {
	name: string
	_id: string
	colors: Array<string>
	successCounter: number
	failCounter: number
	lifetimeSuccessCounter: number
	lifetimeFailCounter: number
	didChange: boolean
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