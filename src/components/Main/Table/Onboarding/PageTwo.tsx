import { FunctionComponent } from 'react'

import GoalIllustration from './Illustrations/UndrawTargetSVG'

import styles from './Onboarding.module.css'

const PageTwo: FunctionComponent<{ onNextPage: () => void }> = ({ onNextPage }) => {
	return (
		<div className={styles.pageDiv}>
			<GoalIllustration className={styles.illustration} />
			<h3 className={styles.title}>The goal of the app</h3>

            <div className={styles.paragraphsDiv}>
                <p className={styles.paragraph}>The goal of the app is to build and maintain <span className="main-color">new habits.</span></p>
                <p className={styles.paragraph}>It takes <span className="main-color">30 days</span> to turn a new practice into an effortless habit.</p>
                <p className={styles.paragraph}><span className="main-color">Every day,</span> for each of your habits, report if you have been successful or not implementing this habit during that day.</p>
                <p className={styles.paragraph}><span className="main-color">Keeping track</span> of your habits will help you implement your new habits until you reach 30 days of success and turn that new habit into a <span className="main-color">solidified habit.</span></p>
            </div>

			<div className={styles.btnMargin}>
				<button className="btn btn-sign" onClick={onNextPage}>See more</button>
			</div>
		</div>
	)
}

export default PageTwo
