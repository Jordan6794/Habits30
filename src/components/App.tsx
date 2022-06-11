import React, { useEffect } from 'react'

import './App.css'

import Table from './Table/Table'
import NavBar from './NavBar/NavBar'
import { useAppDispatch } from '../hooks'
import { authActions } from '../store/auth'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const userStorage = localStorage.getItem('User')
		dispatch(authActions.setUser(userStorage ? JSON.parse(userStorage) : null))

	},[dispatch])

	return (
		<div className="App">
			<NavBar />
			<Table />
		</div>
	)
}

export default App
