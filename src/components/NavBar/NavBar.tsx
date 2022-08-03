import React, { useEffect, useState } from 'react'
import decode, { JwtPayload } from 'jwt-decode'

import { useAppSelector } from '../../hooks'
import { Link, NavLink, useLocation } from 'react-router-dom'
import InfosModal from '../Main/Hero/InfosModal'
import LogoutSVG from './LogoutSVG'
import HamburgerSVG from './HamburgerSVG'
import DotsSVG from './DotsSVG'

export default function NavBar() {
	const [showInfos, setShowInfos] = useState(false)
	const user = useAppSelector((state) => state.auth.user)
	const isDemo = user?.result.username === 'Demo Account'

	let location = useLocation()
	
	const tablePathname = '/'

	useEffect(() => {
		const token = user?.token

		if (token) {
			const decodedToken = decode<JwtPayload>(token)

			if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
				handleLogout()
			}
		} 
	}, [user])

	function handleLogout() {
		localStorage.removeItem('User')
		window.location.reload()
	}

	return (
		<>
			{showInfos && <InfosModal onExitModal={() => setShowInfos(false)} />}
			<header className="App-navbar">
				<div className="container nav-container">
					<div className="nav-left">
						<HamburgerSVG />
						<h4 className="header-title">Habits30</h4>
						<DotsSVG />
						<NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
							<li>Dashboard</li>
						</NavLink>
						<NavLink to="/" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
							<li>Habits</li>
						</NavLink>
						{location.pathname === tablePathname && <button className='navlink btn btn-primary btn-how' onClick={() => setShowInfos(true)}>How it works</button>}
					</div>
					<ul className="nav-links">
						<Link to="/landing">
							<li>To Landing</li>
						</Link>
						{user && <li>{user?.result?.username}</li>}
						{!user && (
							<Link to="/login">
								<li>Login</li>
							</Link>
						)}
						{user && <li className='logout' onClick={handleLogout}>Logout <LogoutSVG /></li>}
						{(!user || isDemo) && (
							<Link to="/signup">
								<li className='btn btn-sign'>Signup</li>
							</Link>
						)}
					</ul>
				</div>
			</header>
		</>
	)
}
