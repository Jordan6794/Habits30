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
	// const pieColors = ['gray', 'green', 'red', '#20C98B']
	// const chartsColors = ['#9B9EA3', '#2CABE3', '#FFC36D', '#20C98B'] // first gray : 9B9EA3
	const chartsColors = ['rgb(155, 158, 163)', 'rgb(86,202,0)', 'rgb(255, 76, 81)', 'rgb(32, 201, 139)']
	// const chartsColors = ['rgba(155, 158, 163, 0.82)', 'rgba(86,202,0, 0.82)', 'rgba(255, 76, 81, 0.82)', 'rgba(32, 201, 139, 0.82)']

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
						<h3>General stats</h3>
					</div>
					<div className={styles.topContentDiv}>
						<div className={`${styles.statBoxDiv} ${styles.marginRight} ${styles.neutralColor}`}>
							<p>Number of habits : {habits.length}</p>
						</div>
						<div className={`${styles.statBoxDiv} ${styles.marginRight} ${styles.greenColor}`}>
							<p>Total successes : {totalSuccesses}</p>
						</div>
						<div className={`${styles.statBoxDiv} ${styles.marginRight} ${styles.redColor}`}>
							<p>Total fails : {totalFails}</p>
						</div>
						<div className={styles.statBoxDiv}>
							<p>Win/Lose ratio : {successFailRatio} %</p>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.bottomStatsDiv}>
				<div className={styles.bottomStatsContainer}>
					<div className={styles.pieDiv}>
						<h3>Habits repartition</h3>
						<div className={styles.chartDiv}>
							<PieComponent data={pieData} colors={chartsColors} />
						</div>
						<div className={styles.pieTextStats}>
							<div className={`${styles.statBoxDiv} ${styles.neutralColor}`}>
								<p>No streak : {noStreakHabits}</p>
							</div>
							<div className={`${styles.statBoxDiv} ${styles.greenColor}`}>
								<p>Success Streak : {successStreakHabits}</p>
							</div>
							<div className={`${styles.statBoxDiv} ${styles.redColor}`}>
								<p>Fail streak : {failStreakHabits}</p>
							</div>
							<div className={styles.statBoxDiv}>
								<p>Solidified : {solidifiedHabits}</p>
							</div>
						</div>
					</div>

					<div className={styles.barChartDiv}>
						<h3>Streak durations</h3>
						<div className={`${styles.chartDiv} ${styles.barChart}`}>
							<BarChartComponent data={barData} colors={chartsColors} />
						</div>
						<div className={styles.pieTextStats}>
							<div className={`${styles.statBoxDiv} ${styles.neutralColor}`}>
								<p>Smallest : {smallestSuccessHabit}</p>
							</div>
							<div className={`${styles.statBoxDiv} ${styles.greenColor}`}>
								<p>Median : {medianSuccesses}</p>
							</div>
							<div className={`${styles.statBoxDiv} ${styles.redColor}`}>
								<p>Average : {averageSuccesses}</p>
							</div>
							<div className={`${styles.statBoxDiv}`}>
								<p>Biggest : {mostSuccessHabit}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dasboard
