//jshint esversion:6
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import BackgroundSVG from './SVG/BackgroundSVG'
import HabitRow from './HabitRow'
import NewHabitForm from './NewHabitForm'

import { postHabit, deleteHabit } from '../../../actions/habits'
import { Habit } from './habits.model'
import { SUCCESS_FINISH_COLOR } from '../../../consts/consts'
import { TableSkeleton } from '../../../shared/skeletons'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { habitsActions } from '../../../store/habitsSlice'
import { makeDaysArray } from '../../../services/effects.service'

function Table() {
	const habits = useAppSelector((state) => state.habits)
	const isLoadingHabits = useAppSelector((state) => state.loading)
	const dispatch = useAppDispatch()

	const ongoingHabits = habits.filter((habit) => habit.colors[0] !== SUCCESS_FINISH_COLOR)
	const finishedHabits = habits.filter((habit) => habit.colors[0] === SUCCESS_FINISH_COLOR)

	let daysArray: number[] = []
	makeDaysArray(daysArray)

	async function handleSubmitHabit(habitName: string) {
		const newHabit: Habit = {
			name: habitName,
			_id: uuidv4(),
			colors: [],
			successCounter: 0,
			failCounter: 0,
			lifetimeSuccessCounter: 0,
			lifetimeFailCounter: 0,
			history: [],
			historyStep: 0,
		}
		await postHabit(newHabit)
		dispatch(habitsActions.add({ habit: newHabit }))
	}

	function onDeleteHabit(deleteIndex: number) {
		const _id = habits[deleteIndex]._id
		deleteHabit(_id)
		dispatch(habitsActions.delete({ index: deleteIndex }))
	}

	function createHabitRow(habit: Habit, index: number, isFinished: boolean) {
		return <HabitRow habitObject={habit} isFinished={isFinished} key={habit._id} delete={onDeleteHabit} />
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
		<div className="container relative">
			<div className="background-div">
				<BackgroundSVG />
			</div>

			<table className="habit-table">
				<thead>
					<tr className="table-first-row">
						<th className="table-habit-title-cell">
							<h4 className="table-habit-title">Habits</h4>
						</th>
						{daysArray.map(makeDaysHtml)}
					</tr>
				</thead>

				<tbody>
					{isLoadingHabits && <TableSkeleton />}
					{ongoingHabits.map((habit, index) => createHabitRow(habit, index, false))}
					<NewHabitForm handleSubmitHabit={handleSubmitHabit} />
				</tbody>
			</table>

			{finishedHabits.length > 0 && (
				<table className="habit-table">
					<thead>
						<tr className="table-first-row">
							<th className="table-habit-title-cell">
								<h4 className="table-habit-title">Solidified Habits</h4>
							</th>
							{daysArray.map(makeDaysHtml)}
						</tr>
					</thead>

					<tbody>{finishedHabits.map((habit, index) => createHabitRow(habit, index, true))}</tbody>
				</table>
			)}
		</div>
	)
}

export default Table
