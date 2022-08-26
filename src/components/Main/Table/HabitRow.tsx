import React, { FunctionComponent, useState } from 'react'

import HabitCell from './HabitCell'

import { Habit } from './habits.model'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { habitsActionsThunk } from '../../../store/habitsSlice'
import HabitEditModal from './HabitEditModal'

const HabitRow: FunctionComponent<{
	habitObject: Habit
	isFinished: boolean
	delete: (deleteIndex: number) => void
}> = (props) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const dispatch = useAppDispatch()

	const habit = useAppSelector((state) => state.habits.find((habit) => habit._id === props.habitObject._id))!
	const { colors, successCounter, failCounter } = habit
	const index = useAppSelector((state) => state.habits.findIndex((habit) => habit._id === props.habitObject._id))


	function handleClickedGood() {
		dispatch(habitsActionsThunk.addSuccessAction(index))
	}
	function handleClickedBad() {
		dispatch(habitsActionsThunk.addFailAction(index))
	}
	//? name handleDeleteButtonClick too long ?
	function handleDeleteButtonClick() {
		props.delete(index)
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
	

	const colorsCells = colors.map((color: string, index: number) => (
		<HabitCell lastIndex={colors.length - 1} key={index} color={color} index={index} />
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
					</button>{' '}
				</div>

				{isEditModalOpen && <HabitEditModal saveName={handleUpdateName} name={habit.name} exitModal={() => setIsEditModalOpen(false)} />}
				<p className="th-habit-name" onClick={() => setIsEditModalOpen(prev => !prev)}>{props.habitObject.name}</p>

				<div className="th-plus-minus-div">
					{streakCounterDisplay}
					<button className="btn-icon btn-plus" onClick={handleClickedGood}>
						<i className="fa-solid fa-plus"></i>
					</button>{' '}
					<button className="btn-icon btn-minus" onClick={handleClickedBad}>
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
