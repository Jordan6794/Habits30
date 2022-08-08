import { FunctionComponent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './Nav.module.css'

const NavLeft: FunctionComponent<{setShowInfos: React.Dispatch<React.SetStateAction<boolean>>, setShowHamburgerModal: React.Dispatch<React.SetStateAction<boolean>>, isModal: boolean}> = ({setShowInfos, setShowHamburgerModal ,isModal}) => {
	let location = useLocation()
	
	const tablePathname = '/habits'

	function handleHowToClick(){
		if(isModal){
			setShowHamburgerModal(false)
		}
		setShowInfos(true)
	}

	return (
		<>
			<h4 className={styles.headerTitle}>Habits30</h4>
			<NavLink to="/dashboard" className={({ isActive }) => (isModal ? '' : isActive ? `${styles.navlink} ${styles.active}` : styles.navlink)}>
				<li className={isModal ? styles.modalItem : ''}>Dashboard</li>
			</NavLink>
			<NavLink to="/habits" className={({ isActive }) => ((isModal) ? '' : isActive ? `${styles.navlink} ${styles.active}` : styles.navlink)}>
				<li className={isModal ? styles.modalItem : ''}>Habits</li>
			</NavLink>
			{location.pathname === tablePathname && (
				<button className={`${!isModal && styles.navlink} btn btn-primary btn-how ${isModal && 'btn-how-modal'}`} onClick={handleHowToClick}>
					How it works
				</button>
			)}
		</>
	)
}

export default NavLeft
