//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDayArray } from '../services/effects.service'

import Habbit from './Habbit'

import {
	getHabits,
	postHabit,
	deleteHabit,
} from '../actions/habbits'
import { HabitModel } from './habits.model'
import { NUMBER_OF_DAYS } from '../consts/consts'

// TODO Refacto all code
// design
// refacto code a bit (allcaps nonchanging const that are exported, not allcaps if stays within the file)

// Improvements : Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
// faire un petit explanation paragraph on top (2 reds or 3 reds in 14 = back to day 1, 14 green = bigGreen etc)
// put first habit with few days already done if habbits array nul in begining
// Add un counter de added streak en darkred/finished
// Make name editable (popup edit habit ?) (ou alors contenteditable + manually onChange qui update in state & db ?) 
// + maybe add arrows to move up/down habits in the list

function Table() {
	const [habits, setHabits] = useState<HabitModel[]>([])
	const [habitInput, setHabitInput] = useState('')
	let daysArray: number[] = []

	makeDayArray(daysArray, NUMBER_OF_DAYS)

	useEffect(() => {
		if(habits.length === 0){
			getHabits().then((response) => {
				response.forEach((habit) => {
					console.log('habit in forEach : ', habit)
					addHabit({
						name: habit.name,
						_id: habit._id,
						colors: habit.colors,
					})
				})
			})
		}
	}, [])

	async function postHabitToDatabase(habit: HabitModel) {
		const result = await postHabit(habit)
		console.log(result)
	}

	function deleteHabitFromDatabase(habitId: string) {
		deleteHabit(habitId)
	}

	function changeInput(event) {
		const inputValue: string = event.target.value
		setHabitInput(inputValue)
	}

	function addHabit(newHabit: HabitModel) {
		setHabits((prevHabits) => [...prevHabits, newHabit])
	}

	function submitHabit(event) {
		const newHabit: HabitModel = {
			name: habitInput,
			_id: uuidv4(),
			colors: [],
		}
		addHabit(newHabit)
		postHabitToDatabase(newHabit)
		event.preventDefault()
		setHabitInput('')
	}

	function onDeleteHabit(deleteIndex: number) {
		setHabits((prevHabits) => {
			return prevHabits.filter((habit, index) => {
				if (index === deleteIndex) {
					deleteHabitFromDatabase(habit._id)
				}
				return index !== deleteIndex
			})
		})
	}

	function createHabit(habit: HabitModel, index: number) {
		return (
			<Habbit
				habitObject={habit}
				name={habit.name}
				key={habit._id}
				index={index}
				delete={onDeleteHabit}
			/>
		)
	}

	function MakeDays(day: number) {
		return <th key={day}>Day {day}</th>
	}

	return (
		<div>
			<form>
				<input onChange={changeInput} value={habitInput}></input>
				<button onClick={submitHabit}>Submit</button>
			</form>
			<table>
				<thead>
					<tr>
						<th>Habbit</th>
						{daysArray.map(MakeDays)}
					</tr>
				</thead>

				<tbody>{habits.map(createHabit)}</tbody>
			</table>
		</div>
	)
}

export default Table
