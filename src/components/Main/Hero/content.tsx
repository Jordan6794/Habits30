import CheckSVG from '../Table/SVG/CheckSVG'
import CheckCircleSVG from '../Table/SVG/CheckCircleSVG'
import CheckShieldSVG from '../Table/SVG/CheckShieldSVG'
import XSVG from '../Table/SVG/XSVG'
import XCircleSVG from '../Table/SVG/XCircleSVG'

import styles from './MainHero.module.css'

export const contentP1 = (
	<>
		<p className={styles.infoParagraph}>
			It takes <span className="main-color">30 days</span> to turn a new activity into an effortless habit.
		</p>
		<p className={styles.infoParagraph}>
			The goal is to successfully manage to be consistent executing this new habit for 30 days, so that it becomes a <span className="main-color">solidified</span> habit.
		</p>
	</>
)

export const contentP2 = (
	<>
		<p className={styles.infoParagraph}>Every day, report for each habit if you have been successful or not today.</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon btn-plus no-padding">
				<i className="fa-solid fa-plus"></i>
			</button>
			{' '}if you have been successful.
		</p>
		<p className={styles.infoParagraph}>
			Press {' '}
			<button className="btn-icon btn-minus no-padding">
				<i className="fa-solid fa-plus"></i>
			</button>
			{' '}if you have failed.
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon btn-undo no-padding">
				<i className="fa-solid fa-rotate-left"></i>
			</button>{' '}
			to undo the last action on your habit.
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon btn-undo no-padding">
				<i className="fa-solid fa-rotate-right"></i>
			</button>{' '}
			to redo the last action you undid.
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon no-padding">
				<i className="fa-solid fa-broom"></i>
			</button>
			{' '}to clear and reset a habit.
		</p>
		<p className={styles.infoParagraph}>
			Press{' '}
			<button className="btn-icon no-padding">
				<i className="fa-solid fa-trash"></i>
			</button>
			{' '}to delete a habit.
		</p>
		<p className={styles.infoParagraph}>Click on the name of a habit to edit its name.</p>
	</>
)

export const contentP3 = (
	<>
		<p className={styles.infoParagraph}>
			The <span className="green-counter no-padding">(counter)</span> indicates the total number of days you've been successful with that habit.
		</p>
		<p className={styles.infoParagraph}>
			It will be <span className="red-counter no-padding">(red)</span> if you have failed more than succeeded on that habit, in which case the counter
			indicates the number of days that you failed.
		</p>
		<p className={styles.infoParagraph}>
			After you accumulate <span className="green-counter no-padding">10</span> validated days (
			<span className={styles.verticalAlign}>
				<CheckSVG />
			</span>
			), you will get into the first streak{' '}
			(<span className={styles.verticalAlign}>
				<CheckCircleSVG />
			</span>)
		</p>
		<p className={styles.infoParagraph}>
			One{' '}
			<span className={styles.verticalAlign}>
				<CheckCircleSVG />
			</span>{' '}
			is equal to 10{' '}
            <span className={styles.verticalAlign}>
				<CheckSVG />
			</span>
		</p>
        <p className={styles.infoParagraph}>
			However, if you fail too much, you will lose all your streaks and your habit will turn into a failing streak{' '}
			<span className={styles.verticalAlign}>
                <XCircleSVG />
			</span>
		</p>
        <p className={styles.infoParagraph}>
			It will take 3 fails (
			<span className={styles.verticalAlign}>
                <XSVG />
			</span>
            ), or 2 fails in a row to make you lose your streaks.
		</p>
        <p className={styles.infoParagraph}>
			After you accumulate <span className="green-counter no-padding">30 days</span> of success, which corresponds to three 10 days streaks (
			<span className={styles.verticalAlign}>
                <CheckCircleSVG />
			</span>
            ), your habit will turn into a solidified habit : {' '}
            <span className={styles.verticalAlign}>
                <CheckShieldSVG />
			</span>
		</p>
        <p className={styles.infoParagraph}>
			But if you have been on a rampage and got <span className="green-counter no-padding">20 days</span> of success without a single failure, your habit will directly turn into a solidified habit : {' '}
            <span className={styles.verticalAlign}>
                <CheckShieldSVG />
			</span>
		</p>
	</>
)
