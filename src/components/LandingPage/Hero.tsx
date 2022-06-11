import { FunctionComponent } from 'react'

import Gym from './gym.svg'
import styles from './LandingPage.module.css'

const Hero: FunctionComponent = () => {
	return (
		<div className={styles.heroDiv}>
			<div className={styles.heroLeftDiv}>
				<h1 className={styles.heroTitle}>
					Manage your habits <br /> like a fucking boss.
				</h1>
				<p className={styles.heroSubtitle}>
					Inovative system to track and manage your habits.<br />So that you can finally put in places new habits that you want in your life.
				</p>
                <button className={`btn ${styles.btn} ${styles.btnHero}`}>Try our demo</button>
                <button className={`btn ${styles.btn} ${styles.btnInvisible}`}>Sign Up Now</button>
			</div>
			<div className={styles.heroRightDiv}>
				<Gym className={styles.heroSVG} />
			</div>
		</div>
	)
}

export default Hero
