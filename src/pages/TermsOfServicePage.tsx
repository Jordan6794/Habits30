import { FunctionComponent } from 'react'

import Nav from '../components/LandingPage/Nav'
import TermsOfService from '../components/Other/TermsOfService/TermsOfService'

import styles from "../components/LandingPage/LandingPage.module.css"

const TermsOfServicePage: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<Nav />
			<TermsOfService />
		</div>
	)
}

export default TermsOfServicePage