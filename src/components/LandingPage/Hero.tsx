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
					The ideal tool to develop and manage new habits.<br />Implement the habits that you want to design the life that you want.
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
