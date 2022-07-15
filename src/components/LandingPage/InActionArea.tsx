import { FunctionComponent } from 'react'

import styles from './LandingPage.module.css'

const InActionArea: FunctionComponent = () => {
	return (
        <div className={styles.inActionDiv}>
            <h1>Habit Streak Manager In Action :</h1> 

            <div className={styles.laptopDiv}>
                <div className={styles.laptopDivMargin}>
                    <img className={`${styles.imgScreenshot} ${styles.img1}`}src='dashboard.png' alt='habits in action' />
                    <img className={`${styles.imgScreenshot} ${styles.img2}`} src='localhost.png' alt='habits in action' />
                </div>
            </div>
        </div>
    )
}
export default InActionArea