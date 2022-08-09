import { FunctionComponent } from 'react'

import styles from './LandingPage.module.css'

const InActionArea: FunctionComponent = () => {
	return (
        <div className={styles.inActionDiv}>
            <h1>Habits30 In Action</h1> 

            <div className={styles.laptopDiv}>
                <img className={`${styles.laptop}`}src='macbook.png' alt='habits in action' />
                <div className={styles.laptopDivMargin}>
                    <img className={`${styles.imgScreenshot} ${styles.img1}`}src='scrnHabits.png' alt='habits in action' />
                    <img className={`${styles.imgScreenshot} ${styles.img2}`} src='scrnDashboard.png' alt='habits in action' />
                    <img className={`${styles.imgScreenshot} ${styles.img3}`}src='scrnHow.png' alt='habits in action' />

                    <img className={`${styles.phoneMockup}`} src='phone.png' alt='phone mockup' />
                    <img className={`${styles.phoneStatusBarMockup}`} src='phone-status-bar.jpg' alt='phone mockup' />
                    <img className={`${styles.imgScreenshotPhone} ${styles.img1}`}src='scrnHabitsPhone.png' alt='habits in action' />
                    <img className={`${styles.imgScreenshotPhone} ${styles.img2}`} src='scrnDashboardPhone.png' alt='habits in action' />
                    <img className={`${styles.imgScreenshotPhone} ${styles.img3}`}src='scrnHowPhone.png' alt='habits in action' />
                </div>
            </div>
        </div>
    )
}
export default InActionArea