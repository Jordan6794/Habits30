//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDayArray as makeDaysArray } from '../../services/effects.service'

import HabitRow from './HabitRow'
import NewHabitForm from './NewHabitForm'

import { getHabits, postHabit, deleteHabit } from '../../actions/habits'
import { Habit } from './habits.model'
import { NUMBER_OF_DAYS, Collection } from '../../consts/consts'
import { TableSkeleton } from '../../shared/skeletons'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { habitsActions } from '../../store/habits'

function Table() {
	const [isLoadingHabits, setIsLoadingHabits] = useState(false)

	const ongoingHabits = useAppSelector(state => state.habits[Collection.Ongoing])
	const finishedHabits = useAppSelector(state => state.habits[Collection.Finished])
	const dispatch = useAppDispatch()

	let daysArray: number[] = []

	makeDaysArray(daysArray, NUMBER_OF_DAYS)

	useEffect(() => {
		const fetchHabits = async (collection: Collection) => {

			if(collection === Collection.Ongoing){setIsLoadingHabits(true)}
			try {
				const response = await getHabits(collection)
				//? correct way obligé de recheck response ici ?
				if(response && response.length > 0){
					dispatch(habitsActions.set({habits: response, collection}))
				}

			} catch (error) {
				console.log('error fetching habits in table : ', error)
			}
			if(collection === Collection.Ongoing){setIsLoadingHabits(false)}
		}

		if (ongoingHabits.length === 0) {
			fetchHabits(Collection.Ongoing)
			fetchHabits(Collection.Finished)
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
			shouldSwitchCollection: false,
			didChange: false
		}
		await postHabit(newHabit, Collection.Ongoing)
		dispatch(habitsActions.add({habit: newHabit, collection: Collection.Ongoing}))
	}

	function onDeleteHabit(deleteIndex: number, collection: Collection) {
		const _id = collection === Collection.Ongoing ? ongoingHabits[deleteIndex]._id : finishedHabits[deleteIndex]._id
		deleteHabit(_id, collection)
		dispatch(habitsActions.delete({index: deleteIndex, collection}))
	}

	function createHabitRow(habit: Habit, index: number, collection: Collection) {
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
						{ongoingHabits.map((habit, index) => createHabitRow(habit, index, Collection.Ongoing))}
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
						{finishedHabits.map((habit, index) => createHabitRow(habit, index, Collection.Finished))}
					</tbody>
				</table>}
		</div>
	)
}

export default Table
