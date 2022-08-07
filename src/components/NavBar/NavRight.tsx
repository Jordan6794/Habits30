import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { DEMO_ACCOUNT_USERNAME } from '../../consts/consts'

import { useAppSelector } from '../../hooks'
import { logout } from '../../lib/logout.service'
import LogoutSVG from './LogoutSVG'

import styles from './Nav.module.css'

const NavRight: FunctionComponent<{ isModal: boolean }> = ({ isModal }) => {
	const user = useAppSelector((state) => state.auth.user)
	const isDemo = user?.result.username === DEMO_ACCOUNT_USERNAME
	return (
		<>
			{user && <li className={isModal ? styles.modalItem : ''}>{user?.result?.username}</li>}
			{!user && (
				<Link to="/login">
					<li>Login</li>
				</Link>
			)}
			{user && (
				<li className={`${isModal ? `${styles.modalItem} ${styles.modalLogout}` : ''} ${styles.logout}`} onClick={logout}>
					Logout <LogoutSVG />
				</li>
			)}
			{(!user || isDemo) && (
				<Link to="/signup">
					<li className="btn btn-sign">Signup</li>
				</Link>
			)}
		</>
	)
}

export default NavRight
