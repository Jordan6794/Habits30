import React, { useState } from 'react'

export default function NewHabitForm({ handleSubmitHabit }) {
	const [habitInput, setHabitInput] = useState('')

	function onChangeInput(event) {
		const inputValue: string = event.target.value
		setHabitInput(inputValue)
	}

	function onSubmitHabit(event) {
		handleSubmitHabit(habitInput)
		event.preventDefault()
		setHabitInput('')
	}

	return (
		<form className="habit-form">
			<label htmlFor="habit-input">New Habit : </label>
			<input
				id="habit-input"
				className="habit-input"
				onChange={onChangeInput}
				value={habitInput}
			/>
			<button className="btn" onClick={onSubmitHabit}>
				Submit
			</button>
		</form>
	)
}
