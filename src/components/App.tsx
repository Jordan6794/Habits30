import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'

import Table from './Table/Table'
import NavBar from './NavBar/NavBar'
import { useAppDispatch } from '../hooks'
import { authActions } from '../store/authSlice'
import LandingPage from './LandingPage/LandingPage'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const userStorage = localStorage.getItem('User')
		dispatch(authActions.setUser(userStorage ? JSON.parse(userStorage) : null))
	}, [dispatch])

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<><NavBar /><Table /></>} />
				<Route path='landing' element={<LandingPage />} />
			</Routes>
					
		</div>
	)
}

export default App
