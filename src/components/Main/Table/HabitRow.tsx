import React, { FunctionComponent, useState } from 'react'

import HabitCell from './HabitCell'

import { DayStatus, Habit } from './habits.model'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { habitsActionsThunk } from '../../../store/habitsSlice'
import HabitEditModal from './HabitEditModal'
import { addDays, getTodayKey } from '../../../services/dates.service'
import { UNKNOWN_COLLAPSE_THRESHOLD, UNKNOWN_COLOR } from '../../../consts/consts'

// Long runs of unknown days are collapsed into one cell showing their count
function makeDisplayCells(colors: string[]) {
	const cells: Array<{ color: string; count: number }> = []
	colors.forEach((color) => {
		const lastCell = cells[cells.length - 1]
		if (color === UNKNOWN_COLOR && lastCell?.color === UNKNOWN_COLOR) {
			lastCell.count++
		} else {
			cells.push({ color, count: 1 })
		}
	})
	return cells.flatMap((cell) =>
		cell.color === UNKNOWN_COLOR && cell.count <= UNKNOWN_COLLAPSE_THRESHOLD
			? Array.from({ length: cell.count }, () => ({ color: UNKNOWN_COLOR, count: 1 }))
			: [cell]
	)
}

const HabitRow: FunctionComponent<{
	habitObject: Habit
	isFinished: boolean
	delete: (deleteIndex: number) => void
}> = (props) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isTargetYesterday, setIsTargetYesterday] = useState(false)
	const dispatch = useAppDispatch()

	const habit = useAppSelector((state) => state.habits.find((habit) => habit._id === props.habitObject._id))!
	const { colors, successCounter, failCounter } = habit
	const index = useAppSelector((state) => state.habits.findIndex((habit) => habit._id === props.habitObject._id))


	// only today and yesterday can be edited, and not before the habit (re)started
	const todayKey = getTodayKey()
	const yesterdayKey = addDays(todayKey, -1)
	const firstEditableDate = habit.startDate > habit.createdOn ? habit.startDate : habit.createdOn
	const canEditYesterday = yesterdayKey >= firstEditableDate
	const targetDate = isTargetYesterday && canEditYesterday ? yesterdayKey : todayKey
	const targetStatus = habit.log[targetDate]

	function setTargetDayStatus(status: DayStatus) {
		dispatch(habitsActionsThunk.setDayStatusAction(index, targetDate, status))
	}
	function handleClickedGood() {
		setTargetDayStatus('success')
	}
	function handleClickedBad() {
		setTargetDayStatus('fail')
	}
	//? name handleDeleteButtonClick too long ?
	function handleDeleteButtonClick() {
		props.delete(index)
	}
	function handleFavoriteButtonClick() {
		dispatch(habitsActionsThunk.toggleFavoriteAction(index))
	}
	function handleClearButtonClick() {
		dispatch(habitsActionsThunk.clearColorsAction(index))
	}
	function handleUndoButtonClick() {
		dispatch(habitsActionsThunk.undoColorsAction(index))
	}
	function handleRedoButtonClick() {
		dispatch(habitsActionsThunk.redoColorsAction(index))
	}
	function handleUpdateName(newName: string){
		dispatch(habitsActionsThunk.updateNameAction(index, newName))
	}
	

	const displayCells = makeDisplayCells(colors)
	const colorsCells = displayCells.map((cell, index: number) => (
		<HabitCell lastIndex={displayCells.length - 1} key={index} color={cell.color} count={cell.count} index={index} />
	))

	const streakCounterDisplay =
		successCounter >= failCounter ? (
			<p className={`green-counter`}>({successCounter})</p>
		) : (
			<p className={`red-counter`}>({failCounter})</p>
		)

	return (
		<tr className="habit-row">
			<th className="habit-row-infos">
				<div className="th-undo-clear-div">
					<button className="btn-icon" onClick={handleDeleteButtonClick}>
						<i className="fa-solid fa-trash"></i>
					</button>
					<button className="btn-icon" onClick={handleClearButtonClick}>
						<i className="fa-solid fa-broom"></i>
					</button>
					<button
						className={`btn-icon btn-favorite ${habit.isFavorite ? 'btn-favorite-active' : ''}`}
						onClick={handleFavoriteButtonClick}
						title={habit.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
						aria-label={habit.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
						aria-pressed={!!habit.isFavorite}
					>
						<i className={`${habit.isFavorite ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
					</button>{' '}
				</div>

				{isEditModalOpen && <HabitEditModal habit={habit} saveName={handleUpdateName} name={habit.name} exitModal={() => setIsEditModalOpen(false)} />}
				<p className="th-habit-name" onClick={() => setIsEditModalOpen(prev => !prev)}>{props.habitObject.name}</p>

				<div className="th-plus-minus-div">
					{streakCounterDisplay}
					<button
						className="btn-icon btn-day-target"
						disabled={!canEditYesterday}
						title={canEditYesterday ? 'Switch the day you are marking' : 'Yesterday is before this habit started'}
						onClick={() => setIsTargetYesterday((prev) => !prev)}
					>
						{targetDate === yesterdayKey ? 'Yesterday' : 'Today'}
					</button>
					<button className={`btn-icon btn-plus ${targetStatus === 'success' ? 'btn-day-active' : ''}`} onClick={handleClickedGood}>
						<i className="fa-solid fa-plus"></i>
					</button>{' '}
					<button className={`btn-icon btn-minus ${targetStatus === 'fail' ? 'btn-day-active' : ''}`} onClick={handleClickedBad}>
						<i className="fa-solid fa-plus"></i>
					</button>
				</div>
			</th>

			{colorsCells}

			{/* Undo */}
			{habit.historyStep > 0 && 
			<th className="th-undo-btn">
				<div className='center-container'>
					
					<button className="btn-icon btn-undo" onClick={handleUndoButtonClick}>
						<i className="fa-solid fa-rotate-left"></i>
					</button>
				</div>
			</th>}

			{/* Redo */}
			{(habit.history.length > 0 && habit.historyStep < habit.history.length - 1) &&
			<th className="th-undo-btn">
				<div className='center-container'>
					
					<button className="btn-icon btn-undo" onClick={handleRedoButtonClick}>
						<i className="fa-solid fa-rotate-right"></i>
					</button>
				</div>
			</th>}
		</tr>
	)
}

export default HabitRow
