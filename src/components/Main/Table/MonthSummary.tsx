import { FunctionComponent, useState } from 'react'

import styles from './MonthSummary.module.css'
import { useAppSelector } from '../../../hooks'
import { calculateDayCounts } from '../../../services/stats.service'
import { addMonths, formatMonth, getMonthDateKeys, getMonthKey, getTodayKey } from '../../../services/dates.service'
import { getEarliestDate } from '../../../services/habitReplay.service'

// Win / fail / unknown counts of all the habits, for each day of a month (so far for the current one)
const MonthSummary: FunctionComponent = () => {
	const habits = useAppSelector((state) => state.habits)

	const todayKey = getTodayKey()
	const currentMonth = getMonthKey(todayKey)
	// we can go back to the month of the oldest day of all the habits
	const earliestMonth = habits.map((habit) => getMonthKey(getEarliestDate(habit))).reduce(
		(earliest, habitMonth) => (habitMonth < earliest ? habitMonth : earliest),
		currentMonth
	)

	const [month, setMonth] = useState(currentMonth)
	const dates = getMonthDateKeys(month).filter((date) => date <= todayKey)

	return (
		<div className={styles.summary}>
			<div className={styles.header}>
				<div className={styles.navigation}>
					<button className="btn-icon" disabled={month <= earliestMonth} onClick={() => setMonth((prev) => addMonths(prev, -1))}>
						<i className="fa-solid fa-chevron-left"></i>
					</button>
					<h4 className={styles.title}>{formatMonth(month)}</h4>
					<button className="btn-icon" disabled={month >= currentMonth} onClick={() => setMonth((prev) => addMonths(prev, 1))}>
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</div>
				<span className={styles.legend}>
					<span className={styles.success}>Win</span> · <span className={styles.fail}>Fail</span> ·{' '}
					<span className={styles.unknown}>Unknown</span>
				</span>
			</div>

			<div className={styles.days}>
				{dates.map((date) => {
					const counts = calculateDayCounts(habits, date, todayKey)
					return (
						<div key={date} className={`${styles.day} ${date === todayKey ? styles.today : ''}`}>
							<span className={styles.dayNumber}>{Number(date.slice(8))}</span>
							<span className={styles.success}>{counts.success}</span>
							<span className={styles.fail}>{counts.fail}</span>
							<span className={styles.unknown}>{counts.unknown}</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default MonthSummary
