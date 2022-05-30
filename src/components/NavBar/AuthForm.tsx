import React, { useState } from 'react'

import { signup, signin } from '../../actions/auth'
import { formData } from './formData.model'

export default function AuthForm({
	p_isSignup,
	exitModal,
}: {
	p_isSignup: boolean
	exitModal: () => void
}) {
	const [isSignup, setIsSignup] = useState<boolean>(p_isSignup)
	//? duplicate name formdata okay ? lololol l'interface qui duplicate le name
	const [formData, setFormdata] = useState<formData>({
		username: '',
		password: '',
		repeatPassword: ''
	})
	const isFormValid =
		formData.username !== '' &&
		formData.password !== '' &&
		(formData.repeatPassword !== '' || !isSignup)

	function onChangeUsername(event) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, username: inputValue }))
	}

	function onChangePassword(event) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, password: inputValue }))
	}

	function onChangeRepeatPassword(event) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, repeatPassword: inputValue }))
	}

	async function handleSignup(inputs: formData) {
		const response = await signup(inputs)
		if (response) {
			localStorage.setItem('User', JSON.stringify(response))
			window.location.reload()
		}
	}

	async function handleSignin(formInfos: formData) {
		const data = await signin(formInfos)
		if (data) {
			localStorage.setItem('User', JSON.stringify(data))
			window.location.reload()
		}
	}

	function onSubmit(event) {
		event.preventDefault()
		if (isSignup) {
			handleSignup(formData)
		} else {
			handleSignin(formData)
		}
		resetForm()
		exitModal()
	}

	function resetForm() {
		setFormdata({ username: '', password: '', repeatPassword: '' })
	}

	return (
		<>
			<h3 className="auth-form-title">{isSignup ? 'Signup' : 'Login'}</h3>
			<form className="auth-form">
				<div className="auth-form-text-field">
					<input
						id="username"
						onChange={onChangeUsername}
						value={formData.username}
						required
					/>
					<span></span>
					<label htmlFor="username">Username </label>
				</div>
				<div className="auth-form-text-field">
					<input
						type="password"
						id="password"
						onChange={onChangePassword}
						value={formData.password}
						required
					/>
					<span></span>
					<label htmlFor="password">Password </label>
				</div>
				{isSignup && (
					<div className="auth-form-text-field">
						<input
							type="password"
							id="repeat-password"
							onChange={onChangeRepeatPassword}
							value={formData.repeatPassword}
							required
						/>
						<span></span>
						<label htmlFor="repeat-password">Repeat Password </label>
					</div>
				)}
				<div>
					<button
						disabled={!isFormValid}
						className="btn auth-btn"
						onClick={onSubmit}
					>
						{isSignup ? 'Signup' : 'Login'}
					</button>
					<div className="switch-login_signup">
						{isSignup
							? 'Already have an account ?'
							: "Don't have an account yet ?"}
						<button
							type="button"
							className="auth-link"
							onClick={() => {
								setIsSignup((prev) => !prev)
								resetForm()
							}}
						>
							{isSignup ? 'Login' : 'Signup'}
						</button>
					</div>
				</div>
			</form>
		</>
	)
}
