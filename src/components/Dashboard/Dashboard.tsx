import { FunctionComponent } from 'react'

import { useAppSelector } from '../../hooks'
import {
	calculateAverageSuccesses,
	calculateMostSuccessesHabit,
	calculateNonStreakedHabits,
	calculateSmallestSuccessesHabit,
	calculateStreakedHabits,
	calculateTotalSuccesses,
	calculateSuccessesFailRatio,
	calculateTotalFails,
	calculateMedianSuccesses,
} from '../../services/stats.service'
import { SUCCESS_STREAK_COLOR, SUCCESS_FINISH_COLOR, FAIL_STREAK_COLOR } from '../../consts/consts'

import PieComponent from './PieComponent'
import BarChartComponent from './BarChartComponent'
import StatBox from './StatBox'

import styles from './Dashboard.module.css'

const Dasboard: FunctionComponent = () => {
	const habits = useAppSelector((state) => state.habits)

	const totalSuccesses = calculateTotalSuccesses(habits)
	const totalFails = calculateTotalFails(habits)
	const successFailRatio = calculateSuccessesFailRatio(habits)

	const smallestSuccessHabit = calculateSmallestSuccessesHabit(habits)
	const mostSuccessHabit = calculateMostSuccessesHabit(habits)
	const averageSuccesses = calculateAverageSuccesses(habits)
	const medianSuccesses = calculateMedianSuccesses(habits)

	const solidifiedHabits = calculateStreakedHabits(habits, SUCCESS_FINISH_COLOR)
	const successStreakHabits = calculateStreakedHabits(habits, SUCCESS_STREAK_COLOR)
	const failStreakHabits = calculateStreakedHabits(habits, FAIL_STREAK_COLOR)
	const noStreakHabits = calculateNonStreakedHabits(habits)

	const pieData = [
		{ name: 'No streak', value: noStreakHabits },
		{ name: 'Success Streak', value: successStreakHabits },
		{ name: 'Fail streak', value: failStreakHabits },
		{ name: 'Solidified', value: solidifiedHabits },
	]
	const pieColors = ['gray', 'green', 'red', '#20C98B']

	const barData = [
		{ name: 'Smallest', Successes: smallestSuccessHabit },
		{ name: 'Median', Successes: medianSuccesses },
		{ name: 'Average', Successes: averageSuccesses },
		{ name: 'Biggest', Successes: mostSuccessHabit },
	]

	return (
		<>
			<div className={styles.topStatsDiv}>
				<div className={styles.topStatsContainer}>
					<div className={styles.topTitleDiv}>
						<h3>Habits number</h3>
					</div>
					<div className={styles.topContentDiv}>
						<div className={`${styles.statBoxDiv} ${styles.marginRight}`}>
							<p>Number of habits : {habits.length}</p>
						</div>
						<StatBox>
							<p>Total successes : {totalSuccesses}</p>
						</StatBox>
						<div className={`${styles.statBoxDiv} ${styles.marginRight}`}>
							<p>Total fails : {totalFails}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Win/Lose ratio : {successFailRatio} %</p>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.bottomStatsDiv}>
				<div className={styles.pieDiv}>
					<h3>Habits repartition</h3>
					<div className={styles.charttDiv}>
						<PieComponent data={pieData} colors={pieColors} />
					</div>
					<div className={styles.pieTextStats}>
						<div className={styles.statBoxDiv}>
							<p>No streak : {noStreakHabits}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Success Streak : {successStreakHabits}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Fail streak : {failStreakHabits}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Solidified : {solidifiedHabits}</p>
						</div>
					</div>
				</div>

				<div className={styles.barChartDiv}>
					<h3>Streak durations</h3>
					<div className={styles.chartDiv}>
						<BarChartComponent data={barData} />
					</div>
					<div className={styles.pieTextStats}>
						<div className={styles.statBoxDiv}>
							<p>Smallest : {smallestSuccessHabit}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Median : {medianSuccesses}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Average : {averageSuccesses}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Most : {mostSuccessHabit}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dasboard
