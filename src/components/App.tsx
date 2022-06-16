import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppDispatch } from '../hooks'
import { authActions } from '../store/authSlice'

import LandingPage from '../pages/LandingPage'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import RegisterDemo from '../pages/RegisterDemo'

import './App.css'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const userStorage = localStorage.getItem('User')
		dispatch(authActions.setUser(userStorage ? JSON.parse(userStorage) : null))
	}, [dispatch])

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='landing' element={<LandingPage />} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='register-demo' element={<RegisterDemo />} />
			</Routes>
					
		</div>
	)
}

export default App
