import { FunctionComponent } from 'react'

import HabitsIllustration from './Illustrations/UndrawFitnessStatsSVG'

import styles from './Onboarding.module.css'

const PageThree: FunctionComponent<{ onNextPage: () => void }> = ({ onNextPage }) => {
	return (
		<div className={styles.pageDiv}>
			<HabitsIllustration className={styles.illustration} />
			<h3 className={styles.title}>Your habits</h3>

            <div className={styles.paragraphsDiv}>
                <p className={styles.paragraph}>Your habits are tracked in regards to their <span className="main-color">streaks,</span> which means how many days you have been successful without failing too much.</p>
                <p className={styles.paragraph}>Each one of your habits has <span className="main-color">its own timeline,</span> where Day 1 represents the first day that you started this particular habit.</p>
                <p className={styles.paragraph}>If you fail too much, your streak will return to 0 and you are <span className="main-color">back to Day 1.</span></p>
                <p className={styles.paragraph}>However, if you keep being successful, your habit will progress into the next streaks until it becomes a <span className="main-color">solidified habit.</span></p>
            </div>

			<div className={styles.btnMargin}>
				<button className="btn btn-sign" onClick={onNextPage}>See more</button>
			</div>
		</div>
	)
}

export default PageThree
