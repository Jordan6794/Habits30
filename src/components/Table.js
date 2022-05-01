//jshint esversion:6
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Habbit from './Habbit'

import { getHabits } from '../actions/habbits'

//TODO  put database
// need to put a onChange fonction pour changer le habbit.name when change contentEditable ?
// put first habbit with few days already done if habbits array nul in begining
// faire un petit explanation paragraph on top (2 reds or 3 reds in 14 = back to day 1, 14 green = bigGreen etc)
// design
// refacto code a bit (allcaps nonchanging const that are exported, not allcaps if stays within the file)
// make soem small sort of animation when clicking some buttons ? Already by defaut seems, a voir when redesign btns

// Improvements : Make a second part "finished" habbits bellow, et faire un array de finished habbits rendered en bas, quand l'habbit passe finished elle est add au finishedHabbitArray et vice versa si elle refail
// Add un counter de added streak en darkred/finished
// Make name editable (popup edit habit ?) + maybe add arrows to move up/down habits in the list

function Table() {
	const [habits, setHabits] = useState([])
	const [habitInput, setHabitInput] = useState('')
	const numberOfDays = 20
	let daysArray = []

	function makeDayArray() {
		for (let i = 1; i <= numberOfDays; i++) {
			daysArray.push(i)
		}
	}

	makeDayArray()

	useEffect(() => {
    if(habits.length === 0){

      setHabits((prevHabits) => [
        ...prevHabits,
        { name: 'Organizer morning', id: uuidv4() },
      ])
  
      getHabits().then((response) => {
        console.log('habbits fetched : ', response)
        if (response.length > 0) {
          response.forEach((habit) => {
            console.log('habit in forEach : ', habit)
            addHabit({name: habit.name, id: habit.id})
          })
        }
      })
    }
	}, [])

	function changeInput(e) {
		const inputValue = e.target.value
		setHabitInput(inputValue)
	}

	function addHabit(newHabit) {
		setHabits(prevHabits => [...prevHabits, newHabit])
	}

	function submitHabit(e) {
		const newHabbit = { name: habitInput, id: uuidv4() }
		addHabit(newHabbit)
		e.preventDefault()
		setHabitInput('')
	}

	function deleteHabit(deleteIndex) {
		setHabits((prevHabits) => {
			return prevHabits.filter((habit, index) => {
				return index !== deleteIndex
			})
		})
	}

	function createHabit(habbit, index) {
		return (
			<Habbit
				name={habbit.name}
				key={habbit.id}
				index={index}
				delete={deleteHabit}
			/>
		)
	}

	function MakeDays(day) {
		return <th key={day}>Day {day}</th>
	}

	return (
		<div>
			<form post="/">
				<input onChange={changeInput} value={habitInput}></input>
				<button onClick={submitHabit} type="submit">
					Submit
				</button>
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
