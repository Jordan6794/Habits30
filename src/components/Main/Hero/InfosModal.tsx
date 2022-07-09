import { FunctionComponent } from 'react'

import ModalPart from './ModalPart'

import styles from './MainHero.module.css'
import { contentP1, contentP2, contentP3 } from './content'

const InfosModal: FunctionComponent<{ onExitModal: () => void }> = ({ onExitModal }) => {

	return (
		<>
			<div className="backdrop" onClick={onExitModal}></div>
			<div className={styles.infosModal}>
				<h3>How it Works</h3>

				<ModalPart title={'Objective'} icon={<i className={`fa-solid fa-bullseye ${styles.infoIcon}`}></i>} content={contentP1}/>
                <ModalPart title={'Actions'} icon={<i className={`fa-solid fa-down-left-and-up-right-to-center ${styles.infoIcon}`}></i>} content={contentP2}/>
                <ModalPart title={'Streaks'} icon={<i className={`fa-solid fa-chart-line ${styles.infoIcon}`}></i>} content={contentP3}/>
			</div>
		</>
	)
}

export default InfosModal
