import { FunctionComponent } from 'react'

import Auth from '../components/Auth/Auth'

const Signup: FunctionComponent = () => {
	return (
		<>
			<Auth isSignup={true} isDemo={false}/>
		</>
	)
}

export default Signup