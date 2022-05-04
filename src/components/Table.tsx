//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { makeDayArray } from '../services/effects.service'

import HabbitRow from './HabbitRow'

import {
	getHabits,
	postHabit,
	deleteHabit,
} from '../actions/habbits'
import { Habit } from './habits.model'
import { NUMBER_OF_DAYS } from '../consts/consts'

// TODO Refacto all code
// design
// refacto code a bit (allcaps nonchanging const that are exported, not allcaps if stays within the file)
// add login and make database user based

// Improvements : Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
// faire un petit explanation paragraph on top (2 reds or 3 reds in 14 = back to day 1, 14 green = bigGreen etc)
// put first habit with few days already done if habbits array nul in begining
// Add un counter de added streak en darkred/finished
// Make name editable (popup edit habit ?) (ou alors contenteditable + manually onChange qui update in state & db ?) 
// + maybe add arrows to move up/down habits in the list

function Table() {
	const [habits, setHabits] = useState<Habit[]>([])
	const [habitInput, setHabitInput] = useState('')
	let daysArray: number[] = []

	makeDayArray(daysArray, NUMBER_OF_DAYS)

	useEffect(() => {
		if(habits.length === 0){
			getHabits().then((response) => {
				response.forEach((habit) => {
					addHabitToState({
						name: habit.name,
						_id: habit._id,
						colors: habit.colors,
					})
				})
			})
		}
	}, [])

	function onChangeInput(event) {
		const inputValue: string = event.target.value
		setHabitInput(inputValue)
	}

	function addHabitToState(newHabit: Habit) {
		setHabits((prevHabits) => [...prevHabits, newHabit])
	}

	function onSubmitHabit(event) {
		const newHabit: Habit = {
			name: habitInput,
			_id: uuidv4(),
			colors: [],
		}
		addHabitToState(newHabit)
		postHabit(newHabit)
		event.preventDefault()
		setHabitInput('')
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
			<HabbitRow
				habitObject={habit}
				name={habit.name}
				key={habit._id}
				index={index}
				delete={onDeleteHabit}
			/>
		)
	}

	function makeDaysHtml(day: number) {
		return <th key={day}>Day {day}</th>
	}

	return (
		<div>
			<form>
				<input onChange={onChangeInput} value={habitInput}></input>
				<button onClick={onSubmitHabit}>Submit</button>
			</form>
			<table>
				<thead>
					<tr>
						<th>Habbit</th>
						{daysArray.map(makeDaysHtml)}
					</tr>
				</thead>

				<tbody>{habits.map(createHabitComponent)}</tbody>
			</table>
		</div>
	)
}

export default Table
