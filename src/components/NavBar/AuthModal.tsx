import React from 'react'

import AuthForm from './AuthForm'

export default function AuthModal({ exitModal, isSignup }) {

	function onExitModal() {
		exitModal()
	}

	return (
		<>
			<div className="backdrop" onClick={onExitModal}></div>
			<div className="modal">
				<AuthForm p_isSignup={isSignup} exitModal={exitModal} />
			</div>
		</>
	)
}
