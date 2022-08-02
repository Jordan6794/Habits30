import { FunctionComponent } from "react"
import { Link } from "react-router-dom"

import ActivityTrackerSVG from './SVG/ActivityTrackerSVG'
import styles from "./LandingPage.module.css"

const CTAAreaLast: FunctionComponent = () => {
    return(
        <div className={styles.ctaLastDiv}>
            <div className={styles.ctaLastLeftDiv}>
                <h1 className={styles.heroTitle}>
                    Get started today
                </h1>
                <p className={styles.heroSubtitle}>
                    Take back control of your life and build the lifestyle you've always wanted
                </p>
                <Link to='/register-demo'><button className={`${styles.btn} ${styles.btnPrimary} {styles.btnLastCTA}`}>Try our demo</button></Link>
                <Link to='/signup'><button className={`${styles.btn} ${styles.btnInvisible}`}>Sign Up</button></Link>
            </div>
            <div>
                <ActivityTrackerSVG />
            </div>
        </div>
    )
}

export default CTAAreaLast