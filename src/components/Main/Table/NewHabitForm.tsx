import React, { FunctionComponent, useState } from 'react'

const NewHabitForm: FunctionComponent<{handleSubmitHabit: (habitName: string) => Promise<void>}> = ({ handleSubmitHabit }) => {
	const [habitInput, setHabitInput] = useState('')
	const [isAdding, setIsAdding] = useState(false)

	function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = event.target.value
		setHabitInput(inputValue)
	}

	async function onSubmitHabit(event: React.FormEvent) {
		event.preventDefault()
		setIsAdding(true)
		await handleSubmitHabit(habitInput)
		setIsAdding(false)
		setHabitInput('')
	}

	return (
		<tr className="habit-row">
			<th className="habit-row-infos">
				<form className="habit-form">
					<label htmlFor="habit-input">New Habit : </label>
					<input
						id="habit-input"
						className="habit-input"
						onChange={onChangeInput}
						value={habitInput}
						placeholder="Write your new habit here"
					/>
					<button disabled={isAdding || !habitInput} className="btn btn-add-habit" onClick={onSubmitHabit}>
						{isAdding ? 'Adding...' : 'Add'}
					</button>
				</form>
			</th>
		</tr>
	)
}

export default NewHabitForm