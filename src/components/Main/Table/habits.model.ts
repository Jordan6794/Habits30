export interface Habit {
	name: string
	_id: string
	colors: Array<string>
	successCounter: number
	failCounter: number
	previousArrays: Array<Array<string>>
	didChange: boolean
    history: Array<HistoryObject>
    historyStep: number
}

export interface HistoryObject {
    colors: Array<string>
    successCounter: number
	failCounter: number
}