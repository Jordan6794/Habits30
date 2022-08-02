import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import GymSVG from './SVG/GymSVG'

import styles from './LandingPage.module.css'

const Hero: FunctionComponent = () => {
	return (
		<div className={styles.heroDiv}>
			<div className={styles.heroLeftDiv}>
				<h1 className={styles.heroTitle}>
					Manage your habits <br />like a <span className={styles.mainColor}>professional.</span>
				</h1>
				<p className={styles.heroSubtitle}>
					Inovative system to track and manage your habits.<br />So that you can finally put in place the new habits that you want in your life.
				</p>
                <Link to='/register-demo'><button className={`${styles.btn} ${styles.btnHero}`}>Try our demo</button></Link>
                <Link to='/signup'><button className={`${styles.btn} ${styles.btnInvisible}`}>Sign Up</button></Link>
			</div>
			<div className={styles.heroRightDiv}>
				<GymSVG />
			</div>
		</div>
	)
}

export default Hero
