import { FunctionComponent, ReactElement } from "react"

import styles from './LandingPage.module.css'

const AreaOneCard: FunctionComponent<{icon: ReactElement, title: string, text: string}> = ({icon, title, text}) => {
    return (
        <div className={styles.cardOneDiv}>
            {icon}
            <h3 className={styles.cardOneTitle}>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default AreaOneCard