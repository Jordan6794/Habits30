import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import decode, { JwtPayload } from 'jwt-decode'

import { useAppDispatch, useAppSelector } from '../hooks'
import { authActions } from '../store/authSlice'
import { habitsActions } from '../store/habitsSlice'
import { getHabits } from '../actions/habits'
import { loadingActions } from '../store/loadingSlice'
import { logout } from '../lib/logout.service'

import LandingPage from '../pages/LandingPage'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import RegisterDemo from '../pages/RegisterDemo'
import Dashboard from '../pages/Dashboard'
import TermsOfServicePage from '../pages/TermsOfServicePage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'

import './App.css'

function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const user = useAppSelector((state) => state.auth.user)

	//checking user token
	useEffect(() => {
		const token = user?.token
		
		if (token) {
			const decodedToken = decode<JwtPayload>(token)
			
			if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
				logout()
			}
		}
	}, [user])
	
	// dispatching User (and redirecting)
	useEffect(() => {
		const userStorage = localStorage.getItem('User')
		dispatch(authActions.setUser(userStorage ? JSON.parse(userStorage) : null))
		
		// redirecting public/private routes
		const landingPathname = '/'
		if(userStorage){
			if(location.pathname === landingPathname)
			navigate('/habits', {replace: true})
		} else {
			const protectedPathnames = ['/habits', '/dashboard']
			if(protectedPathnames.includes(location.pathname))
			navigate(landingPathname, {replace: true})
		}
	}, [dispatch, navigate, location.pathname])

	// fetching habits from database
	useEffect(() => {
		const fetchHabits = async () => {

			dispatch(loadingActions.set(true))
			try {
				const response = await getHabits()
				if(response && response.length > 0){
					dispatch(habitsActions.set({habits: response}))
				}

			} catch (error) {
				console.log('error fetching habits in table : ', error)
			}
			dispatch(loadingActions.set(false))
		}
		fetchHabits()
	}, [dispatch])

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='dashboard' element={<Dashboard />} />
				<Route path='habits' element={<Main />} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='register-demo' element={<RegisterDemo />} />
				<Route path='tos' element={<TermsOfServicePage />} />
				<Route path='privacy' element={<PrivacyPolicyPage />} />
			</Routes>
					
		</div>
	)
}

export default App
