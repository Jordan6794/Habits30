import { FunctionComponent } from 'react'

import WelcomeIllustration from './Illustrations/UndrawFestivitiesSVG'

import styles from './Onboarding.module.css'

const PageOne: FunctionComponent<{ onFinishOnboarding: () => void, onNextPage: () => void }> = ({ onFinishOnboarding, onNextPage }) => {
	return (
		<div className={styles.pageDiv}>
			<WelcomeIllustration className={styles.illustration} />
			<h3 className={styles.title}>Welcome to <span className="main-color">Habits30!</span></h3>
			<p className={styles.subtext}>Let us show you around!</p>
			<div className={styles.btnMargin}>
				<button className="btn btn-big btn-sign" onClick={onNextPage}>Show me how it works</button>
			</div>
			<div className={styles.btnAreaMargin}>
				<button className="btn btn-ghost" onClick={onFinishOnboarding}>
					I'm okay, I want to jump into the app
				</button>
			</div>
			<p className={styles.reminderText}>
				(You can always click the <button className="btn btn-how btn-small btn-no-click no-margin">How it works</button> button for more
				information)
			</p>
		</div>
	)
}

export default PageOne
