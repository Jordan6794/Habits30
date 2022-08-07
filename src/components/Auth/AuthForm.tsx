import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'

import { signup, signin, googleAuth } from '../../actions/auth'
import { FormData, GoogleAuthData } from './formData.model'
import { matchErrorToMessage } from '../../services/errorManagement.service'
import { DEMO_ACCOUNT_USERNAME } from '../../consts/consts'

import decode, { JwtPayload } from 'jwt-decode'

import styles from './Auth.module.css'

export default function AuthForm({
	isSignup, isDemo
}: {
	isSignup: boolean, isDemo: boolean
}) {
	const [formData, setFormdata] = useState<FormData>({
		email: '',
		username: '',
		password: '',
		repeatPassword: ''
	})
	const [demoMessage, setDemoMessage] = useState('')
	const [demoSuccess, setDemoSuccess] = useState('')
	const [error, setError] = useState('')

	const isFormValid =
		formData.email !== '' &&
		formData.password !== '' &&
		(formData.username !== '' || !isSignup) &&
		(formData.repeatPassword !== '' || !isSignup)

	const navigate = useNavigate()

	useEffect(() => {
		if(isDemo){
			handleDemo()
		}

		async function handleDemo(){
			setDemoMessage('Creating your demo account...')
			const randomNumber = Math.round(Math.random()*10000)
			const credentials = {
				email: `Demo${randomNumber}@demo.com`,
				username: DEMO_ACCOUNT_USERNAME,
				password: 'password',
				repeatPassword: 'password'
			}

			setTimeout(() => {
				setFormdata(prevData => ({...prevData, email: credentials.email}))
			}, 300)
			setTimeout(() => {
				setFormdata(prevData => ({...prevData, username: credentials.username}))
			}, 600)
			setTimeout(() => {
				setFormdata(prevData => ({...prevData, password: credentials.password}))
			}, 800)
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
	
	function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = event.target.value
		setFormdata((prevData) => ({ ...prevData, email: inputValue }))
	}

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
		setError('')
		try {
			const response = await signup(inputs)
			if (response) {
				localStorage.setItem('User', JSON.stringify(response))
				navigate('/', {replace: true})
				window.location.reload()
			}
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message
			const errorDisplay = matchErrorToMessage(errorMessage)
			setError(errorDisplay)
		}
	}

	async function handleSignin(formInfos: FormData) {
		setError('')
		try {
			const data = await signin(formInfos)
			if (data) {
				localStorage.setItem('User', JSON.stringify(data))
				navigate('/', {replace: true})
				window.location.reload()
			}
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message
			const errorDisplay = matchErrorToMessage(errorMessage)
			setError(errorDisplay)
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
	}

	function resetForm() {
		setFormdata({ email: '', username: '', password: '', repeatPassword: '' })
	}

	function handleSwitchAuth() {
		if(isSignup){
			navigate('/login')
		} else {
			navigate('/signup')
		}
	}

	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
		setError('')
		try {
			const userInfo = await axios.get(
				'https://www.googleapis.com/oauth2/v3/userinfo',
				{ headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
			);
			
			//we received correct user infos
			if(userInfo?.data?.sub){
				const { given_name, email, sub} = userInfo.data
				const googleLoginData: GoogleAuthData = { given_name, email, sub }
				console.log(googleLoginData)

				const data = await googleAuth(googleLoginData)
				if (data) {
					localStorage.setItem('User', JSON.stringify(data))
					navigate('/', {replace: true})
					window.location.reload()
				}
			}
			else {
				console.log('User infos were not received properly, response : ', userInfo)
				setError('Something went wrong with google authentification. Please try again')
			}
		} catch (error) {
			console.log(error)
			setError('Something went wrong with google authentification. Please try again')
		}
		},
		onError: errorResponse => {
			console.log(errorResponse)
			setError('Something went wrong with google authentification. Please try again')
		},
	});

	return (
		<div className={styles.formDiv}>
			<div className={styles.upperDiv}>
				<h3 className={styles.logo}>Habits 30</h3>
				<h3 className={styles.title}>{isSignup ? 'Signup' : 'Login'}</h3>
			</div>
			{demoMessage && <p className={styles.demoText}>{demoMessage}</p>}
			{demoSuccess && <p className={styles.demoSuccess}>{demoSuccess}</p>}
			<form className={styles.authForm}>
			<div className={styles.textField}>
					<input
						id="email"
						onChange={onChangeEmail}
						value={formData.email}
						required
					/>
					<span></span>
					<label htmlFor="username">Email </label>
				</div>
				{isSignup && (<div className={styles.textField}>
					<input
						id="username"
						onChange={onChangeUsername}
						value={formData.username}
						required
					/>
					<span></span>
					<label htmlFor="username">Username </label>
				</div>)}
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
						className={`btn btn-auth`}
						onClick={onSubmit}
					>
						{isSignup ? 'Signup' : 'Login'}
					</button>

					
					{/* WORKING WELL TOO */}
					<button type='button' onClick={() => googleLogin()}>
					Sign in with Google 🚀{' '}
					</button>

					{/* WORKING WELL */}
					{/* <div className={styles.googleContainerDiv}>
						<GoogleLogin
							onSuccess={credentialResponse => {
								console.log(credentialResponse)
								if(credentialResponse.credential){
									const decodedToken = decode<JwtPayload>(credentialResponse.credential)
									console.log(decodedToken)
								}
								
							}}
							onError={() => {
								console.log('Login Failed')
							}}
						/>
					</div> */}


					<div className={styles.errorDiv}>
						{error && <p className={styles.errorMessage}>{error}</p>}
					</div>
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
