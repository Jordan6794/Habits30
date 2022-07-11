import { FunctionComponent, useState } from "react";

import InfosModal from "./InfosModal";

import styles from './MainHero.module.css'

const MainHero: FunctionComponent = () => {
    const [showInfos, setShowInfos] = useState(false)

    return(
        <div className="container">
            <h3 className={styles.title}>Manage your habits</h3>
            <p className={styles.moreInfoParagraph}>For more infos on how it works click<button onClick={() => setShowInfos(true)}>Here</button>
            {showInfos && <InfosModal onExitModal={() => setShowInfos(false)} />}</p> 
        </div>
    )
}

export default MainHero