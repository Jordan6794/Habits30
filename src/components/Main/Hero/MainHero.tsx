import { FunctionComponent, useState } from "react";

import InfosModal from "./InfosModal";

import styles from './MainHero.module.css'

const MainHero: FunctionComponent = () => {
    const [showInfos, setShowInfos] = useState(false)

    return(
        <div className="container">
            <h3 className={styles.title}>Manage your habits here</h3>
            <p>For more infos on how it works click</p> <button onClick={() => setShowInfos(true)}>Here</button>
            {showInfos && <InfosModal onExitModal={() => setShowInfos(false)} />}
        </div>
    )
}

export default MainHero