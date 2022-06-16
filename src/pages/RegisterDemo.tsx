import { FunctionComponent } from 'react'

import Auth from '../components/Auth/Auth'

const RegisterDemo: FunctionComponent = () => {
	return (
		<>
			<Auth isSignup={true} isDemo={true}/>
		</>
	)
}

export default RegisterDemo