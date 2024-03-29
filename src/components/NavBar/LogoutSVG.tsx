import { FunctionComponent } from 'react'

import styles from './Nav.module.css'

const LogoutSVG: FunctionComponent = () => {
	return (
		<svg className={styles.logoutIcon} xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white">
			<path d="M5.4 21q-.75 0-1.275-.525Q3.6 19.95 3.6 19.2V5.3q0-.75.525-1.275Q4.65 3.5 5.4 3.5h6.725V5H5.4q-.1 0-.2.1t-.1.2v13.9q0 .1.1.2t.2.1h6.725V21Zm10.725-4.475-1.025-1.1L17.525 13h-8.4v-1.5h8.4L15.1 9.075l1.025-1.1L20.4 12.25Z" />{' '}
		</svg>
	)
}

export default LogoutSVG
