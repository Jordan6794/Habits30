import Check from '../Table/SVG/check.svg'
import CheckCircle from '../Table/SVG/check-circle.svg'
import CheckShield from '../Table/SVG/check-shield.svg'
import XCircle from '../Table/SVG/x-circle.svg'
import X from '../Table/SVG/x.svg'

import styles from './MainHero.module.css'

export const contentP1 = (
	<>
		<p className={styles.infoParagraph}>
			It takes <span className="main-color">30 days</span> to turn a new activity into an effortless habit
		</p>
		<p className={styles.infoParagraph}>
			The goal is to successfully manage to be consistent executing this new habit for 30 days, so that it become a <span className="main-color">solidified</span> habit
		</p>
	</>
)

export const contentP2 = (
	<>
		<p className={styles.infoParagraph}>Everyday, report for each habit if you have been successfull or not today</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon btn-plus no-padding">
				<i className="fa-solid fa-plus"></i>
			</button>
			{' '}if you have been successfull
		</p>
		<p className={styles.infoParagraph}>
			Press {' '}
			<button className="btn-icon btn-minus no-padding">
				<i className="fa-solid fa-plus"></i>
			</button>
			{' '}if you have failed
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon btn-undo no-padding">
				<i className="fa-solid fa-rotate-left"></i>
			</button>{' '}
			to undo the last action on your habit
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon btn-undo no-padding">
				<i className="fa-solid fa-rotate-right"></i>
			</button>{' '}
			to redo the last action you undid
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon no-padding">
				<i className="fa-solid fa-broom"></i>
			</button>
			{' '}to clear and reset a habit
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon no-padding">
				<i className="fa-solid fa-trash"></i>
			</button>
			{' '}to delete a habit
		</p>
		<p className={styles.infoParagraph}>Click on the name of a habit to edit its name</p>
	</>
)

export const contentP3 = (
	<>
		<p className={styles.infoParagraph}>
			The <span className="green-counter no-padding">(counter)</span> indicates the total number of days you've been successfull with that habit
		</p>
		<p className={styles.infoParagraph}>
			It will be <span className="red-counter no-padding">(red)</span> if you have failed more than succeeded on that habit, in which case the counter
			indicates the number of days that you failed
		</p>
		<p className={styles.infoParagraph}>
			After you accumulate <span className="green-counter no-padding">10</span> validated days (
			<span className={styles.verticalAlign}>
				<Check className="habitCellIcon successColor" />
			</span>
			), you will get into the first streak{' '}
			(<span className={styles.verticalAlign}>
				<CheckCircle className="habitCellIcon successColor" />
			</span>)
		</p>
		<p className={styles.infoParagraph}>
			one{' '}
			<span className={styles.verticalAlign}>
				<CheckCircle className="habitCellIcon successColor" />
			</span>{' '}
			is equal to 10{' '}
            <span className={styles.verticalAlign}>
				<Check className="habitCellIcon successColor" />
			</span>
		</p>
        <p className={styles.infoParagraph}>
			However, if you fail too much, you will lose all your streaks and your habit will turn into a failing streak{' '}
			<span className={styles.verticalAlign}>
                <XCircle className="habitCellIcon failColor" />
			</span>
		</p>
        <p className={styles.infoParagraph}>
			It will take 3 fails (
			<span className={styles.verticalAlign}>
                <X className="habitCellIcon failColor" />
			</span>
            ), or 2 fails in a row to make you lose your streaks
		</p>
        <p className={styles.infoParagraph}>
			After you accumulate <span className="green-counter no-padding">30 days</span> of success, which corresponds to three 10 days streaks (
			<span className={styles.verticalAlign}>
                <CheckCircle className="habitCellIcon successColor" />
			</span>
            ), your habit will turn into a solidified habbit : {' '}
            <span className={styles.verticalAlign}>
                <CheckShield className="habitCellIcon successColor" />
			</span>
		</p>
        <p className={styles.infoParagraph}>
			But if you have been on a rampage and got <span className="green-counter no-padding">20 days</span> of success without a single fail, your habit will directly turn into a solidified habit : {' '}
            <span className={styles.verticalAlign}>
                <CheckShield className="habitCellIcon successColor" />
			</span>
		</p>
	</>
)
