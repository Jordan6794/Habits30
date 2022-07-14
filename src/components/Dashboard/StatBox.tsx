import { FunctionComponent } from "react"

import styles from "./Dashboard.module.css"

const StatBox: FunctionComponent<{children?: JSX.Element | JSX.Element[]}> = (props) => {

    return(
        <div className={`${styles.statBoxDiv} ${styles.marginRight}`}>
            {props.children}
        </div>
    )
}

export default StatBox