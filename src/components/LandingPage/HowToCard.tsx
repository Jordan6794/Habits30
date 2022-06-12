import { FunctionComponent } from 'react'

import styles from './LandingPage.module.css'

const HowToCard: FunctionComponent<{ icon: any; number: string; title: string; text: string }> = ({ icon, number, title, text }) => {
	return (
		<div className={styles.howToCardDiv}>
			<h3 className={styles.howToCardNumber}>{number}</h3>
			{/* {icon} */}
            <h3 className={styles.howToCardTitle}>{title}</h3>
			<p>{text}</p>
		</div>
	)
}

export default HowToCard
