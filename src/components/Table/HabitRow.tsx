import React, { FunctionComponent } from 'react'

import HabitCell from './HabitCell'

// import { updateHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActionsThunk } from '../../store/habitsSlice'

const HabitRow: FunctionComponent<{
	habitObject: Habit
	isFinished: boolean
	delete: (deleteIndex: number) => void
}> = (props) => {
	// const [hasInitialized, setHasInitialized] = useState(false)
	const dispatch = useAppDispatch()

	// const { colors, successCounter, failCounter, previousArrays, name, _id, shouldSwitchCollection, didChange } = useAppSelector((state) => state.habits[props.collection][props.index])
	const habit = useAppSelector((state) => state.habits.find((habit) => habit._id === props.habitObject._id)) as Habit
	const { colors, successCounter, failCounter, didChange } = habit
	// const { colors, successCounter, failCounter, previousArrays, name, _id, didSwitchCollection, didChange } = habit
	const index = useAppSelector((state) => state.habits.findIndex((habit) => habit._id === props.habitObject._id))

	// useEffect(() => {
	// 	async function handleUpdate() {
	// 		// we always put didChange: false in the database
	// 		const updatedHabit = {
	// 			name,
	// 			_id,
	// 			colors,
	// 			successCounter,
	// 			failCounter,
	// 			previousArrays,
	// 			didSwitchCollection,
	// 			didChange: false,
	// 		}
	// 		const response = await updateHabit(updatedHabit)
	// 		console.log('update : ', response)
	// 	}
	// 	if (hasInitialized || props.habitObject.didSwitchCollection) {
	// 		handleUpdate()
	// 		if (props.habitObject.didSwitchCollection) {
	// 			setHasInitialized(true)
	// 		}
	// 	} else {
	// 		setHasInitialized(true)
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [colors, failCounter, successCounter, previousArrays, props.habitObject])

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

	const colorsCells = colors.map((color: string, index: number) => (
		<HabitCell lastIndex={colors.length - 1} key={index} color={color} index={index} didChange={didChange} />
	))

	const didChangeClass = didChange ? 'changedCounter' : ''
	const streakCounterDisplay =
		successCounter >= failCounter ? (
			<p className={`${didChangeClass} green-counter`}>({successCounter})</p>
		) : (
			<p className={`${didChangeClass} red-counter`}>({failCounter})</p>
		)

	return (
		<tr className="habit-row">
			<th className="habit-row-infos">
				{props.isFinished && <i className="fa-solid fa-star"></i>}
				<div className="th-undo-clear-div">
					<button className="btn-icon" onClick={handleDeleteButtonClick}>
						<i className="fa-solid fa-trash"></i>
					</button>
					<button className="btn-icon" onClick={handleClearButtonClick}>
						<i className="fa-solid fa-broom"></i>
					</button>{' '}
				</div>

				<p className="th-habit-name">{props.habitObject.name}</p>

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
				<button className="btn-icon btn-undo" onClick={handleUndoButtonClick}>
					<i className="fa-solid fa-rotate-left"></i>
				</button>
			</th>
		</tr>
	)
}

export default HabitRow
