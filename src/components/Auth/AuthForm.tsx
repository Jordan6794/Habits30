import React, { useEffect, useState } from 'react'

import { signup, signin } from '../../actions/auth'
import { FormData } from './formData.model'

import styles from './Auth.module.css'
import { useNavigate } from 'react-router-dom'

export default function AuthForm({
	isSignup, isDemo
}: {
	isSignup: boolean, isDemo: boolean
}) {
	const [formData, setFormdata] = useState<FormData>({
		username: '',
		password: '',
		repeatPassword: ''
	})
	const [demoMessage, setDemoMessage] = useState('')
	const [demoSuccess, setDemoSuccess] = useState('')

	const isFormValid =
		formData.username !== '' &&
		formData.password !== '' &&
		(formData.repeatPassword !== '' || !isSignup)

	const navigate = useNavigate()

	useEffect(() => {
		if(isDemo){
			handleDemo()
		}

		async function handleDemo(){
			console.log('creating')
			setDemoMessage('Creating your demo account...')
			const randomNumber = Math.round(Math.random()*10000)
			const credentials = {
				username: `Demo${randomNumber}`,
				password: 'password',
				repeatPassword: 'password'
			}

			setTimeout(() => {
				setFormdata(prevData => ({...prevData, username: credentials.username}))
			}, 300)
			setTimeout(() => {
				setFormdata(prevData => ({...prevData, password: credentials.password}))
			}, 600)
			setTimeout(() => {
				setFormdata(credentials)
			}, 900)

		const response = await signup(credentials)

		if (response) {
			setDemoMessage('')
			setDemoSuccess('Account created succesffully, redirecting soon...')

			setTimeout(() => {
				localStorage.setItem('User', JSON.stringify(response))
				navigate('/', {replace: true})
				window.location.reload()
			}, 2500)
		}
		}
	}, [isDemo, navigate])

	function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, username: inputValue }))
	}

	function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, password: inputValue }))
	}

	function onChangeRepeatPassword(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, repeatPassword: inputValue }))
	}

	async function handleSignup(inputs: FormData) {
		const response = await signup(inputs)
		if (response) {
			localStorage.setItem('User', JSON.stringify(response))
			navigate('/', {replace: true})
			window.location.reload()
		}
	}

	async function handleSignin(formInfos: FormData) {
		const data = await signin(formInfos)
		if (data) {
			localStorage.setItem('User', JSON.stringify(data))
			navigate('/', {replace: true})
			window.location.reload()
		}
	}

	function onSubmit(event: React.FormEvent) {
		event.preventDefault()
		if (isSignup) {
			handleSignup(formData)
		} else {
			handleSignin(formData)
		}
		resetForm()
		// exitModal()
	}

	function resetForm() {
		setFormdata({ username: '', password: '', repeatPassword: '' })
	}

	function handleSwitchAuth() {
		if(isSignup){
			navigate('/login', {replace: true})
		} else {
			navigate('/signup', {replace: true})
		}
	}

	return (
		<div className={styles.formDiv}>
			<h3 className={styles.logo}>Habit Streak Manager</h3>
			<h3 className={styles.title}>{isSignup ? 'Signup' : 'Login'}</h3>
			{demoMessage && <p className={styles.demoText}>{demoMessage}</p>}
			{demoSuccess && <p className={styles.demoSuccess}>{demoSuccess}</p>}
			<form className={styles.authForm}>
				<div className={styles.textField}>
					<input
						id="username"
						onChange={onChangeUsername}
						value={formData.username}
						required
					/>
					<span></span>
					<label htmlFor="username">Username </label>
				</div>
				<div className={styles.textField}>
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
					<div className={styles.textField}>
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
						disabled={!isFormValid || isDemo}
						className={`btn ${styles.btn}`}
						onClick={onSubmit}
					>
						{isSignup ? 'Signup' : 'Login'}
					</button>
					<div className={styles.switchLogin_signup}>
						{isSignup
							? 'Already have an account ?'
							: "Don't have an account yet ?"}
						<button
							type="button"
							className={styles.link}
							onClick={handleSwitchAuth}
						>
							{isSignup ? 'Login' : 'Signup'}
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
