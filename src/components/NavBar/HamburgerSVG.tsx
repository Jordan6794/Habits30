import { FunctionComponent } from 'react'

import styles from './Nav.module.css'

const HamburgerSVG: FunctionComponent<{onClick: any}> = ({onClick}) => {
	return (
		<svg onClick={onClick} className={styles.hamburgerIcon} xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white">
			<path d="M3.25 17.625v-1.5h17.5v1.5Zm0-4.875v-1.5h17.5v1.5Zm0-4.875v-1.5h17.5v1.5Z" />
		</svg>
	)
}

export default HamburgerSVG
