import { AnyAction, createSelector, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { DayStatus, Habit, HistoryObject, StoredHabit } from '../components/Main/Table/habits.model'
import { createHabitFromStored, deriveHabitState, toStoredHabit } from '../services/habitReplay.service'
import { getTodayKey } from '../services/dates.service'
import { deleteHabit, setLogEntry, updateHabit } from '../actions/habits'
import { RootState } from '.'

const initialHabits: Habit[] = []

// Recomputes colors and counters from the log
function rederive(habit: Habit, todayKey: string) {
	Object.assign(habit, deriveHabitState(habit, todayKey))
}

// Saves the current log in the session history before an action, so it can be undone
function pushHistory(habit: Habit) {
	//If we did undo already we drop the redo part of the history
	if (habit.historyStep !== habit.history.length) {
		habit.history = habit.history.slice(0, habit.historyStep)
	}
	const historyObject: HistoryObject = { startDate: habit.startDate, log: { ...habit.log } }
	habit.history.push(historyObject)
	habit.historyStep++
}

const habitsSlice = createSlice({
	name: 'habits',
	initialState: initialHabits,
	reducers: {
		set(state, action: PayloadAction<{ habits: StoredHabit[]; todayKey: string }>) {
			const { habits, todayKey } = action.payload
			return habits.map((habit) => createHabitFromStored(habit, todayKey))
		},
		add(state, action: PayloadAction<{ habit: StoredHabit; todayKey: string }>) {
			const { habit, todayKey } = action.payload
			state.push(createHabitFromStored(habit, todayKey))
		},
		// soft delete : the habit is hidden but its logs are kept for the stats
		delete(state, action: PayloadAction<{ index: number; todayKey: string }>) {
			const { index, todayKey } = action.payload
			state[index].deletedOn = todayKey
			state[index].history = []
			state[index].historyStep = 0
		},
		updateName(state, action: PayloadAction<{ index: number; newName: string }>) {
			const { index, newName } = action.payload
			state[index].name = newName
		},
		// status null removes the day's entry
		setDayStatus(state, action: PayloadAction<{ index: number; date: string; status: DayStatus | null; todayKey: string }>) {
			const { index, date, status, todayKey } = action.payload
			const habit = state[index]
			if (habit.log[date] === status || (!habit.log[date] && status === null)) {
				return
			}

			pushHistory(habit)
			if (status === null) {
				delete habit.log[date]
			} else {
				habit.log[date] = status
			}
			rederive(habit, todayKey)
		},
		clearColors(state, action: PayloadAction<{ index: number; todayKey: string }>) {
			const { index, todayKey } = action.payload
			const habit = state[index]

			pushHistory(habit)
			// older entries are kept in the log, the replay just starts from today
			habit.startDate = todayKey
			delete habit.log[todayKey]
			rederive(habit, todayKey)
		},
		undoColors(state, action: PayloadAction<{ index: number; todayKey: string }>) {
			const { index, todayKey } = action.payload
			const habit = state[index]

			if (habit.history.length === 0 || habit.historyStep === 0) {
				return
			}
			const step = habit.historyStep
			//If we're on the first undo we add the current state into the array so we can redo to it
			if (step === habit.history.length) {
				habit.history.push({ startDate: habit.startDate, log: { ...habit.log } })
			}
			const { startDate, log } = habit.history[step - 1]
			habit.startDate = startDate
			habit.log = { ...log }
			habit.historyStep--
			rederive(habit, todayKey)
		},
		redoColors(state, action: PayloadAction<{ index: number; todayKey: string }>) {
			const { index, todayKey } = action.payload
			const habit = state[index]

			const step = habit.historyStep
			if (step >= habit.history.length - 1) {
				return
			}
			const { startDate, log } = habit.history[step + 1]
			habit.startDate = startDate
			habit.log = { ...log }
			habit.historyStep++
			rederive(habit, todayKey)
		},
		// when the habit day changed while the app was open
		refreshToday(state, action: PayloadAction<{ todayKey: string }>) {
			const { todayKey } = action.payload
			state.forEach((habit) => {
				// yesterday's actions can now be out of the editable days, so no more undo
				habit.history = []
				habit.historyStep = 0
				rederive(habit, todayKey)
			})
		},
	},
})

export const updateNameAction = (index: number, newName: string): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.updateName({ index, newName }))
		updateHabitFromThunk(getState, index)
	}
}

export const deleteHabitAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		const todayKey = getTodayKey()
		dispatch(habitsActions.delete({ index, todayKey }))
		const habit = getState().habits[index]
		const response = await deleteHabit(habit._id, todayKey)
		console.log('delete : ', response)
	}
}

export const setDayStatusAction = (
	index: number,
	date: string,
	status: DayStatus | null
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.setDayStatus({ index, date, status, todayKey: getTodayKey() }))
		const habit = getState().habits[index]
		const response = await setLogEntry(habit._id, date, status)
		console.log('update : ', response)
	}
}

export const clearColorsAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.clearColors({ index, todayKey: getTodayKey() }))
		updateHabitFromThunk(getState, index)
	}
}

export const undoColorsAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.undoColors({ index, todayKey: getTodayKey() }))
		updateHabitFromThunk(getState, index)
	}
}

export const redoColorsAction = (index: number): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		dispatch(habitsActions.redoColors({ index, todayKey: getTodayKey() }))
		updateHabitFromThunk(getState, index)
	}
}

async function updateHabitFromThunk(getState: () => RootState, index: number) {
	const state = getState()
	const habit = state.habits[index]
	// only the stored fields go in the database, the rest is derived from the log
	const response = await updateHabit(toStoredHabit(habit))
	console.log('update : ', response)
}

// Habits that are not deleted, the ones shown in the tables and dashboard
export const selectActiveHabits = createSelector(
	(state: RootState) => state.habits,
	(habits) => habits.filter((habit) => !habit.deletedOn)
)

export const habitsActionsThunk = { deleteHabitAction, updateNameAction, setDayStatusAction, clearColorsAction, undoColorsAction, redoColorsAction }

export default habitsSlice.reducer
export const habitsActions = habitsSlice.actions
