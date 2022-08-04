import React, { useState } from 'react'

import InfosModal from '../Main/Hero/InfosModal'
import HamburgerSVG from './HamburgerSVG'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

import styles from './Nav.module.css'

export default function NavBar() {
	const [showInfos, setShowInfos] = useState(false)
	const [showHamburgerModal, setShowHamburgerModal] = useState(false)

	return (
		<>
			{showInfos && <InfosModal onExitModal={() => setShowInfos(false)} />}
			{showHamburgerModal && <div className={styles.hamburgerCloseBackdrop} onClick={() => setShowHamburgerModal(false)}></div>}
			<div className={`${styles.hamburgerModal} ${styles.modalNav} ${showHamburgerModal ? styles.hamburgerVisible : ''}`}>
				<span className={styles.closeIcon} onClick={() => setShowHamburgerModal(false)}></span>
				<div className={styles.modalFlex}>
					<div>
						<NavLeft setShowInfos={setShowInfos} setShowHamburgerModal={setShowHamburgerModal} isModal={true}/>
					</div>
					<div className={styles.modalRightNav}>
						<NavRight isModal={true}/>
					</div>
				</div>
			</div>
			<header className={styles.appNavbar}>
				<div className={`container ${styles.navContainer}`}>
					<div className={styles.navLeft}>
						<HamburgerSVG onClick={() =>setShowHamburgerModal(true)}/>
						<NavLeft setShowInfos={setShowInfos} setShowHamburgerModal={setShowHamburgerModal} isModal={false}/>
					</div>
					<ul className={styles.navRight}>
						<NavRight isModal={false}/>
					</ul>
				</div>
			</header>
		</>
	)
}
