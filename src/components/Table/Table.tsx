//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDaysArray } from '../../services/effects.service'

import HabitRow from './HabitRow'
import NewHabitForm from './NewHabitForm'

import { getHabits, postHabit, deleteHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { SUCCESS_FINISH_COLOR } from '../../consts/consts'
import { TableSkeleton } from '../../shared/skeletons'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActions } from '../../store/habitsSlice'

function Table() {
	const [isLoadingHabits, setIsLoadingHabits] = useState(false)

	const habits = useAppSelector(state => state.habits)
	const dispatch = useAppDispatch()

	const ongoingHabits = habits.filter(habit => habit.colors[0] !== SUCCESS_FINISH_COLOR)
	const finishedHabits = habits.filter(habit => habit.colors[0] === SUCCESS_FINISH_COLOR)

	let daysArray: number[] = []

	makeDaysArray(daysArray)
	
	useEffect(() => {
		const fetchHabits = async () => {

			setIsLoadingHabits(true)
			try {
				const response = await getHabits()
				//? correct way obligé de recheck response ici ?
				if(response && response.length > 0){
					dispatch(habitsActions.set({habits: response}))
				}

			} catch (error) {
				console.log('error fetching habits in table : ', error)
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
			didSwitchCollection: false,
			didChange: false
		}
		await postHabit(newHabit)
		dispatch(habitsActions.add({habit: newHabit}))
	}

	function onDeleteHabit(deleteIndex: number) {
		const _id = habits[deleteIndex]._id
		deleteHabit(_id)
		dispatch(habitsActions.delete({index: deleteIndex}))
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
						{ongoingHabits.map((habit, index) => createHabitRow(habit, index, false))}
					</tbody>
				</table>
			{/* </div> */}

			{finishedHabits.length > 0 && <table className="habit-table">
					<thead>
						<tr className="table-first-row">
							<th className="table-habit-title-cell">
								<h4 className="table-habit-title">Finished Habit ⭐</h4>
							</th>
							{daysArray.map(makeDaysHtml)}
						</tr>
					</thead>

					<tbody>
						{finishedHabits.map((habit, index) => createHabitRow(habit, index, true))}
					</tbody>
				</table>}
		</div>
	)
}

export default Table
