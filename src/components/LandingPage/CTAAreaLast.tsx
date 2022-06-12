import { FunctionComponent } from "react"

import ActivityTracker from './SVG/activity_tracker.svg'
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
                <button className={`btn ${styles.btn} ${styles.btnPrimary} {styles.btnLastCTA}`}>Try our demo</button>
                <button className={`btn ${styles.btn} ${styles.btnInvisible}`}>Sign Up</button>
            </div>
            <div>
                <ActivityTracker className={styles.activitySVG} />
            </div>
        </div>
    )
}

export default CTAAreaLast