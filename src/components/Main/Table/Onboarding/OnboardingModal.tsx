import { FunctionComponent, useState } from 'react'

import CircleSVG from './SVGs/circle.svg'
import CircleFullSVG from './SVGs/circle_full.svg'

import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'
import PageFour from './PageFour'

import styles from './Onboarding.module.css'

const OnboardingModal: FunctionComponent<{ onFinishOnboarding: () => void }> = ({ onFinishOnboarding }) => {
	const [activePage, setActivePage] = useState(1)

	function goToNextPage() {
		setActivePage((prevPage) => prevPage + 1)
	}

	const pages = [
		<PageOne onFinishOnboarding={onFinishOnboarding} onNextPage={goToNextPage} />,
		<PageTwo onNextPage={goToNextPage} />,
		<PageThree onNextPage={goToNextPage} />,
		<PageFour onFinishOnboarding={onFinishOnboarding} />,
	]

	let pageDisplay = <PageOne onFinishOnboarding={onFinishOnboarding} onNextPage={goToNextPage} />

	switch (activePage) {
		case 2:
			pageDisplay = pages[1]
			break
		case 3:
			pageDisplay = pages[2]
			break
		case 4:
			pageDisplay = pages[3]
            break
	}

	const progressDisplay = (
		<div className={styles.progressDiv}>
			{pages.map((page, i) => ( (i < activePage)
				? <CircleFullSVG key={i} className={styles.progressIcon} />
                :<CircleSVG key={i} className={styles.progressIcon} />
			))}
		</div>
	)

	return (
		<>
			<div className="backdrop backdrop-light"></div>
			<div className={styles.modal}>
				<span className={styles.close} onClick={onFinishOnboarding}></span>
				{pageDisplay}
                {progressDisplay}
			</div>
		</>
	)
}

export default OnboardingModal
