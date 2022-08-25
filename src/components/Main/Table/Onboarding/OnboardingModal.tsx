import { FunctionComponent } from 'react'

import styles from './Onboarding.module.css'

const OnboardingModal: FunctionComponent<{ onFinishOnboarding: () => void }> = ({ onFinishOnboarding }) => {

	return (
		<>
			<div className="backdrop backdrop-light" onClick={onFinishOnboarding}></div>
			<div className={styles.modal}>
				<span className={styles.close} onClick={onFinishOnboarding}></span>
				<h3>Welcome to Habits30!</h3>
			</div>
		</>
	)
}

export default OnboardingModal
