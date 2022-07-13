import React, { useEffect } from 'react'
import decode, { JwtPayload } from 'jwt-decode'

import { useAppSelector } from '../../hooks'
import { Link } from 'react-router-dom'

export default function NavBar() {

	const user = useAppSelector(state => state.auth.user)

	useEffect(() => {
		const token = user?.token

		if(token){
			const decodedToken = decode<JwtPayload>(token)

			if(decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()){
				handleLogout()
			}
		}
	},[user])


	function handleLogout() {
		localStorage.removeItem('User')
		window.location.reload()
	}

	return (
		<>
			<header className="App-navbar">
				<div className="container nav-container">
					<h4 className="header-title">Habits streak manager</h4>
					<ul className="nav-links">
						<Link to='/landing'><li>To Landing</li></Link>
						<Link to='/dashboard'><li>Dasboard</li></Link>
						{<Link to='/'><li>Habits</li></Link>}
						{user ? <li>{user?.result?.username}</li> : <li>Public Account</li>}
						{!user && <Link to='/signup'><li>Signup</li></Link>}
						{!user && <Link to='/login'><li>Login</li></Link>}
						{user && <li onClick={handleLogout}>Logout</li>}
					</ul>
				</div>
			</header>
		</>
	)
}
