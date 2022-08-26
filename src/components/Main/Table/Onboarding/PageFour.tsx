import { FunctionComponent } from 'react'

// import FinishIllustration from './Illustrations/undraw_maker_launch.svg'
import FinishIllustration from './Illustrations/undraw_explore.svg'

import styles from './Onboarding.module.css'

const PageFour: FunctionComponent<{ onFinishOnboarding: () => void }> = ({ onFinishOnboarding }) => {
	return (
		<div className={styles.pageDiv}>
			<h3 className={styles.title}>Start now</h3>

			<div className={styles.paragraphsDiv}>
				<p className={styles.paragraph}>
					In order to add a new habit, write it in the <span className="main-color">New Habit</span> box.
				</p>
				<p className={styles.paragraph}>
					To <span className="main-color">report</span> if you have been successful or if you failed your habits today, use the{' '}
					<button className="btn-icon btn-plus btn-no-click no-padding">
						<i className="fa-solid fa-plus"></i>
					</button>{' '}
					and{' '}
					<button className="btn-icon btn-minus btn-no-click no-padding">
						<i className="fa-solid fa-plus"></i>
					</button>{' '}
					buttons.
				</p>
				<p className={styles.paragraph}>
					You can see all your stats in the{' '}
					<span className="main-color">Dasboard</span> page.
				</p>
				<p className={styles.paragraph}>
					Start by writing now <span className="main-color">that one habit</span> that you want to develop, or be more consistant with.
				</p>
			</div>

			<FinishIllustration className={styles.illustration} />
			<div className={styles.btnAreaMargin}>
				<button className="btn btn-sign" onClick={onFinishOnboarding}>
					Let's start
				</button>
			</div>
			{/* <p className={styles.reminderText}>
				(You can always click the <button className="btn btn-how btn-small btn-no-click no-margin">How it works</button> button for more
				informations)
			</p> */}
		</div>
	)
}

export default PageFour
