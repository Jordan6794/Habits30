import { FunctionComponent } from 'react'
import Nav from '../components/LandingPage/Nav'

import PrivacyPolicy from '../components/Other/PrivacyPolicy/PrivacyPolicy'

import styles from "../components/LandingPage/LandingPage.module.css"

const PrivacyPolicyPage: FunctionComponent = () => {
	return (
		<div className={styles.container}>
            <Nav />
			<PrivacyPolicy />
		</div>
	)
}

export default PrivacyPolicyPage