import React, { useContext, useState, useEffect } from 'react'
import decode, { JwtPayload } from 'jwt-decode'
import { UserContext } from '../../context/userContext'

import AuthModal from './AuthModal'

export default function NavBar() {
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [isSignup, setIsSignup] = useState(false)

	const {user} = useContext(UserContext)

	useEffect(() => {
		const token = user?.token

		if(token){
			const decodedToken = decode<JwtPayload>(token)

			if(decodedToken.exp * 1000 < new Date().getTime()){
				handleLogout()
			}
		}
	},[user])

	function handleOpenLogin() {
		setIsSignup(false)
		setShowLoginModal(true)
	}

	function handleOpenSignup() {
		setIsSignup(true)
		setShowLoginModal(true)
	}

	function handleExitLogin() {
		setShowLoginModal(false)
	}

	function handleLogout() {
		localStorage.removeItem('User')
		window.location.reload()
	}

	return (
		<>
			{showLoginModal && (
				<AuthModal isSignup={isSignup} exitModal={handleExitLogin} />
			)}
			<header className="App-navbar">
				<div className="container nav-container">
					<h4 className="header-title">Habits streak manager</h4>
					<ul className="nav-links">
						{user ? <li>{user?.result?.username}</li> : <li>Public Account</li>}
						{!user && <li onClick={handleOpenSignup}>Signup</li>}
						{!user && <li onClick={handleOpenLogin}>Login</li>}
						{user && <li onClick={handleLogout}>Logout</li>}
					</ul>
				</div>
			</header>
		</>
	)
}
