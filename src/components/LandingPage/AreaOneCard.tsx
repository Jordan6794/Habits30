import { FunctionComponent } from "react"

import styles from './LandingPage.module.css'

const AreaOneCard: FunctionComponent<{icon: any, title: string, text: string}> = ({icon, title, text}) => {
    return (
        <div className={styles.cardOneDiv}>
            {icon}
            <h3 className={styles.cardOneTitle}>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default AreaOneCard