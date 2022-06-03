//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDayArray as makeDaysArray } from '../../services/effects.service'

import HabitRow from './HabitRow'
import NewHabitForm from './NewHabitForm'

import { getHabits, postHabit, deleteHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { NUMBER_OF_DAYS } from '../../consts/consts'
import { TableSkeleton } from '../../shared/skeletons'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActions } from '../../store/habits'

function Table() {
	const [isLoadingHabits, setIsLoadingHabits] = useState(false)

	const habits = useAppSelector(state => state.habits)
	const dispatch = useAppDispatch()

	let daysArray: number[] = []

	makeDaysArray(daysArray, NUMBER_OF_DAYS)

	useEffect(() => {
		const fetchHabits = async () => {
			setIsLoadingHabits(true)
			try {
				const response = await getHabits()
				dispatch(habitsActions.set(response))

			} catch (error) {
				console.log('error in table : ', error)
			}
			setIsLoadingHabits(false)
		}

		if (habits.length === 0) {
			fetchHabits()
		}
	}, [dispatch])

	async function handleSubmitHabit(habitName: string) {
		const newHabit: Habit = {
			name: habitName,
			_id: uuidv4(),
			colors: [],
			successCounter: 0,
			failCounter: 0,
			previousArrays: [],
		}
		await postHabit(newHabit)
		dispatch(habitsActions.add(newHabit))
	}

	function onDeleteHabit(deleteIndex: number) {
		deleteHabit(habits[deleteIndex]._id)
		dispatch(habitsActions.delete(deleteIndex))
	}

	function createHabitRow(habit: Habit, index: number) {
		return <HabitRow habitObject={habit} name={habit.name} key={habit._id} index={index} delete={onDeleteHabit} />
	}

	function makeDaysHtml(day: number) {
		return (
			<th className="table-day-cell" key={day}>
				<span className="days-small">Day</span>
				<br />
				{day}
			</th>
		)
	}

	return (
		<div className="container">
			<NewHabitForm handleSubmitHabit={handleSubmitHabit} />
			{/* <div className="habit-table-container"> */}
				<table className="habit-table">
					<thead>
						<tr className="table-first-row">
							<th className="table-habit-title-cell">
								<h4 className="table-habit-title">Habit</h4>
							</th>
							{daysArray.map(makeDaysHtml)}
						</tr>
					</thead>

					<tbody>
						{isLoadingHabits && <TableSkeleton />}
						{habits.map(createHabitRow)}
					</tbody>
				</table>
			{/* </div> */}
		</div>
	)
}

export default Table
