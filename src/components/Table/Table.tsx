//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDayArray } from '../../services/effects.service'

import HabitRow from './HabitRow'
import NewHabitForm from './NewHabitForm'

import { getHabits, postHabit, deleteHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { NUMBER_OF_DAYS } from '../../consts/consts'
import { TableSkeleton } from '../../shared/skeletons'

function Table() {
	const [habits, setHabits] = useState<Habit[]>([])
	const [isLoadingHabits, setIsLoadingHabits] = useState(false)

	let daysArray: number[] = []

	makeDayArray(daysArray, NUMBER_OF_DAYS)

	useEffect(() => {
		if (habits.length === 0) {
			setIsLoadingHabits(true)
			getHabits().then((response) => {
				response.forEach((habit) => {
					addHabitToState({
						name: habit.name,
						_id: habit._id,
						colors: habit.colors,
					})
				})
				setIsLoadingHabits(false)
			})
		}
	}, [])

	function addHabitToState(newHabit: Habit) {
		setHabits((prevHabits) => [...prevHabits, newHabit])
	}

	function handleSubmitHabit(habitName: string) {
		const newHabit: Habit = {
			name: habitName,
			_id: uuidv4(),
			colors: [],
		}
		addHabitToState(newHabit)
		postHabit(newHabit)
	}

	function onDeleteHabit(deleteIndex: number) {
		setHabits((prevHabits) => {
			return prevHabits.filter((habit, index) => {
				if (index === deleteIndex) {
					deleteHabit(habit._id)
				}
				return index !== deleteIndex
			})
		})
	}

	function createHabitComponent(habit: Habit, index: number) {
		return (
			<HabitRow
				habitObject={habit}
				name={habit.name}
				key={habit._id}
				index={index}
				delete={onDeleteHabit}
			/>
		)
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
					{habits.map(createHabitComponent)}
				</tbody>
			</table>
		</div>
	)
}

export default Table
