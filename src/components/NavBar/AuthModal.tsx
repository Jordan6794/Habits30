import React from 'react'

import AuthForm from './AuthForm'

export default function AuthModal({
	exitModal,
	isSignup,
}: {
	exitModal: () => void
	isSignup: boolean
}) {
	function onExitModal() {
		exitModal()
	}

	return (
		<>
			<div className="backdrop" onClick={onExitModal}></div>
			<div className="modal">
				<span className="close" onClick={onExitModal}></span>
				<AuthForm p_isSignup={isSignup} exitModal={exitModal} />
			</div>
		</>
	)
}
