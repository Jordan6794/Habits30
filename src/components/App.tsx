import React, { useContext, useEffect } from 'react'

import './App.css'

import Table from './Table/Table'
import NavBar from './NavBar/NavBar'
import { UserContext } from '../context/userContext'

function App() {
	const {setUser} = useContext(UserContext)

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('User')))
	},[setUser])

	return (
		<div className="App">
			<NavBar />
			<Table />
		</div>
	)
}

export default App
