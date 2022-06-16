import { FunctionComponent } from 'react'

import Auth from '../components/Auth/Auth'

const Login: FunctionComponent = () => {
	return (
		<>
			<Auth isSignup={false} isDemo={false}/>
		</>
	)
}

export default Login