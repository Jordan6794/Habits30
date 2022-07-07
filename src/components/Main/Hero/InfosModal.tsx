import { FunctionComponent } from "react";

import styles from './MainHero.module.css'


const InfosModal: FunctionComponent<{onExitModal: () => void}> = ({onExitModal}) => {

    return(
        <>
            <div className='backdrop' onClick={onExitModal}></div>
            <div className={styles.infosModal}>
                <h3>All infos</h3>
            </div>
        </>
    )
}

export default InfosModal