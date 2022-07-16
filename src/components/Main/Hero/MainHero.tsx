import { FunctionComponent, useState } from "react";

import InfosModal from "./InfosModal";

import styles from './MainHero.module.css'

const MainHero: FunctionComponent = () => {
    const [showInfos, setShowInfos] = useState(false)

    return(
        <div className='container'>
            <div className={`${styles.heroDiv}`}>
                <p className={styles.moreInfoParagraph}><button className='btn btn-primary btn-how' onClick={() => setShowInfos(true)}>How it works</button>
                {showInfos && <InfosModal onExitModal={() => setShowInfos(false)} />}</p> 
            </div>
        </div>
    )
}

export default MainHero