import React, { useState, useEffect, FunctionComponent } from 'react'

import HabitCell from './HabitCell'

import { switchCollection, updateHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActions } from '../../store/habits'
import { FINISHED, ONGOING } from '../../consts/consts'

const HabitRow: FunctionComponent<{
	habitObject: Habit
	index: number
	collection: string
	name: string
	delete: (deleteIndex: number, collection: string) => void
}> = (props) => {
	const [hasInitialized, setHasInitialized] = useState(false)

	const { colors, successCounter, failCounter, previousArrays } = useAppSelector((state) => state.habits[props.collection][props.index])
	const dispatch = useAppDispatch()

	useEffect(() => {
		async function handleUpdate() {
			const { name, _id, shouldSwitchCollection } = props.habitObject

			if (shouldSwitchCollection) {
				const toCollection = props.collection === ONGOING ? FINISHED : ONGOING
				const response = await switchCollection(props.habitObject, _id, props.collection, toCollection)
				const {index} = props
				dispatch(habitsActions.switchCollection({index, fromCollection: props.collection, toCollection}))
				console.log('switched collection: ', response)
			} else {
				const updatedHabit = {
					name,
					_id,
					colors,
					successCounter,
					failCounter,
					previousArrays,
				}
				const response = await updateHabit(updatedHabit, props.collection)
				console.log('update : ', response)
			}
		}
		if (hasInitialized) {
			handleUpdate()
		} else {
			setHasInitialized(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colors, failCounter, successCounter, previousArrays, props.habitObject])

	//? move all the handles in onClick arrow funct ?
	function handleClickedGood() {
		//? put payload as an object for more clarity in param name ?
		dispatch(habitsActions.addSuccessColor({ index: props.index, collection: props.collection }))
	}
	function handleClickedBad() {
		dispatch(habitsActions.addFailColor({ index: props.index, collection: props.collection }))
	}
	function handleDeleteButtonClick() {
		props.delete(props.index, props.collection)
	}
	function handleClearButtonClick() {
		dispatch(habitsActions.clearColors({ index: props.index, collection: props.collection }))
	}
	function undoButton() {
		dispatch(habitsActions.undoColors({ index: props.index, collection: props.collection }))
	}

	const colorsCells = colors.map((color: string, index: number) => <HabitCell key={index} color={color} index={index} />)

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
