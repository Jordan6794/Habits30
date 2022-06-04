//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDayArray as makeDaysArray } from '../../services/effects.service'

import HabitRow from './HabitRow'
import NewHabitForm from './NewHabitForm'

import { getHabits, postHabit, deleteHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { ONGOING, NUMBER_OF_DAYS, FINISHED } from '../../consts/consts'
import { TableSkeleton } from '../../shared/skeletons'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActions } from '../../store/habits'

function Table() {
	const [isLoadingHabits, setIsLoadingHabits] = useState(false)

	const ongoingHabits = useAppSelector(state => state.habits[ONGOING])
	const finishedHabits = useAppSelector(state => state.habits[FINISHED])
	const dispatch = useAppDispatch()

	let daysArray: number[] = []

	makeDaysArray(daysArray, NUMBER_OF_DAYS)

	useEffect(() => {
		const fetchHabits = async (collection: string) => {

			if(collection === ONGOING){setIsLoadingHabits(true)}
			try {
				const response = await getHabits(collection)
				if(response.length > 0){
					dispatch(habitsActions.set({habits: response, collection}))
				}

			} catch (error) {
				console.log('error fetching habits in table : ', error)
			}
			if(collection === ONGOING){setIsLoadingHabits(false)}
		}

		if (ongoingHabits.length === 0) {
			fetchHabits(ONGOING)
			fetchHabits(FINISHED)
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
			shouldSwitchCollection: false
		}
		await postHabit(newHabit, ONGOING)
		dispatch(habitsActions.add({habit: newHabit, collection: ONGOING}))
	}

	function onDeleteHabit(deleteIndex: number, collection: string) {
		const _id = collection === ONGOING ? ongoingHabits[deleteIndex]._id : finishedHabits[deleteIndex]._id
		deleteHabit(_id, collection)
		dispatch(habitsActions.delete({index: deleteIndex, collection}))
	}

	function createHabitRow(habit: Habit, index: number, collection: string) {
		return <HabitRow collection={collection} habitObject={habit} name={habit.name} key={habit._id} index={index} delete={onDeleteHabit} />
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
						{ongoingHabits.map((habit, index) => createHabitRow(habit, index, ONGOING))}
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
						{isLoadingHabits && <TableSkeleton />}
						{finishedHabits.map((habit, index) => createHabitRow(habit, index, FINISHED))}
					</tbody>
				</table>}
		</div>
	)
}

export default Table
