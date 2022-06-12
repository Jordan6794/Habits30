import { FunctionComponent } from 'react'
import HowToCard from './HowToCard'


import Add from './SVG/add_box.svg'
import Summarize from './SVG/summarize.svg'
import Calculate from './SVG/calculate.svg'
import styles from './LandingPage.module.css'

const HowToArea: FunctionComponent = () => {
	return (
        <div className={styles.howToDiv}>
            <h1 className={styles.howToTitle}>How To Use</h1> 
            <div className={styles.howToCardsDiv}>
                <HowToCard icon={<Add className={styles.googleIcon} />} number="1." title="Add" text="Add new habits that you want to implement in your life" />
                <HowToCard icon={<Summarize className={styles.googleIcon} />} number="2." title="Report" text="Everyday report if you succeeded or failed to do your habits" />
                <HowToCard icon={<Calculate className={styles.googleIcon} />} number="3." title="Enjoy" text="Our algorythm automatically calculate and tells you your habits status" />
            </div>
        </div>
    )
}

export default HowToArea
