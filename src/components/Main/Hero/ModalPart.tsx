import { FunctionComponent, ReactElement } from 'react'

import styles from './MainHero.module.css'

const ModalPart: FunctionComponent<{ icon: ReactElement; title: string; content: JSX.Element }> = ({ icon, title, content }) => {
	return (
		<div className={styles.modalPartDiv}>
			{icon}
			<h3 className={styles.partTitle}>{title}</h3>
			{content}
		</div>
	)
}

export default ModalPart
