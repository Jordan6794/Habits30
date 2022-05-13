import React, { useState } from 'react'
import { signup, signin } from '../../actions/auth'

export default function AuthForm({ p_isSignup, exitModal }) {
	const [isSignup, setIsSignup] = useState(p_isSignup)
	const [formData, setFormdata] = useState({
		username: '',
		password: '',
		repeatPassword: '',
	})

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

	async function handleSignup(formInfos) {
		const data = await signup(formInfos)
		if (data) {
			localStorage.setItem('User', JSON.stringify(data))
			window.location.reload()
		}
	}

	async function handleSignin(formInfos) {
		const data = await signin(formInfos)
		if (data) {
			localStorage.setItem('User', JSON.stringify(data))
			window.location.reload()
		}
	}

	function onSubmit(event) {
		event.preventDefault()
		console.log('formData from form ; ', formData)
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
					<button className="btn auth-btn" onClick={onSubmit}>
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
