import React, { FunctionComponent, useState } from 'react'

const NewHabitForm: FunctionComponent<{handleSubmitHabit: (habitName: string) => Promise<void>}> = ({ handleSubmitHabit }) => {
	const [habitInput, setHabitInput] = useState('')

	function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = event.target.value
		setHabitInput(inputValue)
	}

	function onSubmitHabit(event: React.FormEvent) {
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

export default NewHabitForm