import { FunctionComponent } from 'react'

import Nav from './Nav'
import Hero from './Hero'
import BreakAreaOne from './BreakAreaOne'
import HowToArea from './HowToArea'
import CTAAreaOne from './CTAAreaOne'
import InActionArea from './InActionArea'
import CTAAreaLast from './CTAAreaLast'
import Footer from '../Footer/Footer'

import styles from './LandingPage.module.css'

const LandingPage: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<Nav />
			<Hero />
			<BreakAreaOne />
			<CTAAreaOne />
			<HowToArea />
			<InActionArea />
			<CTAAreaLast />
			<Footer />
		</div>
	)
}

export default LandingPage
