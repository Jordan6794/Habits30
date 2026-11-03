import { FunctionComponent, useState } from 'react'

import CheckSVG from './SVG/CheckSVG'
import XSVG from './SVG/XSVG'

import styles from './HabitCalendar.module.css'
import { StoredHabit } from './habits.model'
import { getDayStatus, getEarliestDate } from '../../../services/habitReplay.service'
import { addMonths, formatMonth, getMonthDateKeys, getMonthKey, getTodayKey, getWeekDayIndex } from '../../../services/dates.service'

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

// Read only monthly view of the results of a habit
const HabitCalendar: FunctionComponent<{ habit: StoredHabit }> = ({ habit }) => {
	const todayKey = getTodayKey()
	const currentMonth = getMonthKey(todayKey)
	const habitFirstMonth = getMonthKey(getEarliestDate(habit))
	const earliestMonth = habitFirstMonth < currentMonth ? habitFirstMonth : currentMonth

	const [month, setMonth] = useState(currentMonth)

	const dates = getMonthDateKeys(month)
	const emptyCellsCount = getWeekDayIndex(dates[0])

	function makeDayCell(date: string) {
		const status = getDayStatus(habit, date, todayKey)
		let icon
		switch (status) {
			case 'success':
				icon = <CheckSVG />
				break
			case 'fail':
				icon = <XSVG />
				break
			case 'unknown':
				icon = <span className={styles.unknown}>?</span>
				break
		}

		return (
			<div key={date} className={`${styles.day} ${status === 'none' ? styles.dayNone : ''} ${date === todayKey ? styles.today : ''}`}>
				<span className={styles.dayNumber}>{Number(date.slice(8))}</span>
				<div className={styles.icon}>{icon}</div>
			</div>
		)
	}

	return (
		<div className={styles.calendar}>
			<div className={styles.header}>
				<button className="btn-icon" disabled={month <= earliestMonth} onClick={() => setMonth((prev) => addMonths(prev, -1))}>
					<i className="fa-solid fa-chevron-left"></i>
				</button>
				<span className={styles.month}>{formatMonth(month)}</span>
				<button className="btn-icon" disabled={month >= currentMonth} onClick={() => setMonth((prev) => addMonths(prev, 1))}>
					<i className="fa-solid fa-chevron-right"></i>
				</button>
			</div>

			<div className={styles.grid}>
				{WEEK_DAYS.map((weekDay, index) => (
					<span key={index} className={styles.weekDay}>
						{weekDay}
					</span>
				))}
				{Array.from({ length: emptyCellsCount }, (_, index) => (
					<div key={`empty-${index}`} />
				))}
				{dates.map(makeDayCell)}
			</div>
		</div>
	)
}

export default HabitCalendar
