import { FunctionComponent } from 'react'

import AuthForm from './AuthForm'

import styles from './Auth.module.css'

const Auth: FunctionComponent<{ isSignup: boolean, isDemo: boolean }> = ({ isSignup, isDemo }) => {
	return (
		<div className={styles.background}>
			<div className={styles.formContainer}>
				<AuthForm isSignup={isSignup} isDemo={isDemo}/>
			</div>
		</div>
	)
}

export default Auth