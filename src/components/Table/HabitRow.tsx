import React, { useState, useEffect, FunctionComponent } from 'react'

import HabitCell from './HabitCell'

import { updateHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActions } from '../../store/habits'

const HabitRow: FunctionComponent<{ habitObject: Habit; index: number; name: string; delete: (deleteIndex: number) => void }> = (props) => {
	const [hasInitialized, setHasInitialized] = useState(false)

	const {colors, successCounter, failCounter, previousArrays} = useAppSelector(state => state.habits[props.index])
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (hasInitialized) {
			const { name, _id } = props.habitObject

			updateHabit({
				name,
				_id,
				colors,
				successCounter,
				failCounter,
				previousArrays,
			}).then((response) => console.log('update : ', response))
		} else {
			setHasInitialized(true)
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colors, failCounter, successCounter, previousArrays, props.habitObject])

	//? move all the handles in onClick arrow funct ?
	function handleClickedGood() {
		dispatch(habitsActions.addSuccessColor(props.index))
	}
	function handleClickedBad() {
		dispatch(habitsActions.addFailColor(props.index))
	}
	function handleDeleteButtonClick() {
		props.delete(props.index)
	}
	function handleClearButtonClick() {
		dispatch(habitsActions.clearColors(props.index))
	}
	function undoButton() {
		dispatch(habitsActions.undoColors(props.index))
	}

	const colorsCells = colors.map((color, index) => <HabitCell key={index} color={color} index={index} />)

	const streakCounterDisplay =
		successCounter >= failCounter ? <p className="green-counter">({successCounter})</p> : <p className="red-counter">({failCounter})</p>

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

				<p className="th-habit-name">{props.name}</p>

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
			<th className="th-undo-btn">
				<button className="btn-icon btn-undo" onClick={undoButton}>
					<i className="fa-solid fa-rotate-left"></i>
				</button>
			</th>
		</tr>
	)
}

export default HabitRow
