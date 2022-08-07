import { FunctionComponent } from 'react'

import TermsOfService from '../components/Other/TermsOfService/TermsOfService'

import styles from "../components/LandingPage/LandingPage.module.css"

const TermsOfServicePage: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<TermsOfService />
		</div>
	)
}

export default TermsOfServicePage