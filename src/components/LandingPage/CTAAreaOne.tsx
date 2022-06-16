import { FunctionComponent } from "react"
import { Link } from "react-router-dom"

import TaskList from './SVG/task_list.svg'
import styles from "./LandingPage.module.css"

const CTAAreaOne: FunctionComponent = () => {
    return(
        <div className={styles.ctaOneDiv}>
            <h1 className={styles.bodyTitle}>
                The ultimate tool to implement new habits into your life
            </h1>
            <p className={styles.bodySubTitle}>
                Finally manage to get the habits that gets you your dream life<br />Try it once and you'll never go back, demo available without making any account
            </p>
            <Link to='/register-demo'><button className={`${styles.btn} ${styles.btnHero} ${styles.btnCTA}`}>Try our demo</button></Link>
            <TaskList className={styles.taskListSVG} />
        </div>
    )
}

export default CTAAreaOne