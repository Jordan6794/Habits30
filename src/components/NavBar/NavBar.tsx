import React, { useEffect } from 'react'
import decode, { JwtPayload } from 'jwt-decode'

import { useAppSelector } from '../../hooks'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
	const user = useAppSelector((state) => state.auth.user)
	const isDemo = user?.result.username === 'Demo Account'

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
			<header className="App-navbar">
				<div className="container nav-container">
					<div className="nav-left">
						<h4 className="header-title">Habits streak manager</h4>
						<NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : undefined)}>
							<li>Dasboard</li>
						</NavLink>
						<NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
							<li>Habits</li>
						</NavLink>
					</div>
					<ul className="nav-links">
						<Link to="/landing">
							<li>To Landing</li>
						</Link>
						{user ? <li>{user?.result?.username}</li> : <li>Public Account</li>}
						{!user && (
							<Link to="/login">
								<li>Login</li>
							</Link>
						)}
						{user && <li className='logout' onClick={handleLogout}>Logout</li>}
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
