import { FunctionComponent, useState } from "react";

import InfosModal from "./InfosModal";

import styles from './MainHero.module.css'

const MainHero: FunctionComponent = () => {
    const [showInfos, setShowInfos] = useState(false)

    return(
        <div className={`container ${styles.heroDiv}`}>
            <h3 className={styles.title}>Manage your habits</h3>
            <p className={styles.moreInfoParagraph}><button className="btn btn-primary" onClick={() => setShowInfos(true)}>For more infos on how it works click here</button>
            {showInfos && <InfosModal onExitModal={() => setShowInfos(false)} />}</p> 
        </div>
    )
}

export default MainHero