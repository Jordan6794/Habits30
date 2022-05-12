import React, { useContext, useState } from 'react'
import { signup, signin } from '../../actions/auth'
import { UserContext } from '../../context/userContext'

export default function AuthForm({ p_isSignup, exitModal }) {
	const [isSignup, setIsSignup] = useState(p_isSignup)
    const [formData, setFormdata] = useState({username: '', password: '', repeatPassword: ''})

	const {setUser} = useContext(UserContext)

	function onChangeUsername(event) {
		const inputValue: string = event.target.value
        setFormdata(prevData => ({...prevData, username: inputValue}))
	}

	function onChangePassword(event) {
		const inputValue: string = event.target.value
        setFormdata(prevData => ({...prevData, password: inputValue}))
	}

	function onChangeRepeatPassword(event) {
		const inputValue: string = event.target.value
        setFormdata(prevData => ({...prevData, repeatPassword: inputValue}))
	}

	async function handleSignup(formInfos){
		const data = await signup(formInfos)
		if(data){
			localStorage.setItem('User', JSON.stringify(data))
			setUser(data)
		}
	}

	async function handleSignin(formInfos){
		const data = await signin(formInfos)
		if(data){
			localStorage.setItem('User', JSON.stringify(data))
			setUser(data)
		}
	}

	function onSubmit(event) {
        event.preventDefault()
		console.log('formData from form ; ', formData)
        if(isSignup){
            handleSignup(formData)
        } else {
            handleSignin(formData)
        }
		resetForm()
        exitModal()
	}

	function resetForm() {
		setFormdata({username: '', password: '', repeatPassword: ''})
	}

	return (
		<form>
			<h3>{isSignup ? 'Signup' : 'Login'} form</h3>
			<label htmlFor="username">Username </label>
			<input id="username" onChange={onChangeUsername} value={formData.username} />
			<label htmlFor="password">Password </label>
			<input
				type="password"
				id="password"
				onChange={onChangePassword}
				value={formData.password}
			/>
			{isSignup && (
				<>
					<label htmlFor="repeat-password">Repeat Password </label>
					<input
						type="password"
						id="repeat-password"
						onChange={onChangeRepeatPassword}
						value={formData.repeatPassword}
					/>
				</>
			)}
			<button className="btn" onClick={onSubmit}>
				{isSignup ? 'Signup' : 'Login'}
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => {
					setIsSignup((prev) => !prev)
					resetForm()
				}}
			>
				Switch to {isSignup ? 'Login' : 'Signup'}
			</button>
		</form>
	)
}
