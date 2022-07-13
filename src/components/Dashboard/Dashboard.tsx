import { FunctionComponent } from 'react'

import { useAppSelector } from '../../hooks'
import {
  calculateAverageSuccesses,
  calculateMostSuccessesHabit,
	calculateMostSuccessfulHabit,
	calculateNonStreakedHabits,
	calculateSmallestSuccessesHabit,
	calculateStreakedHabits,
	calculateTotalSuccesses,
	calculateSuccessesFailRatio,
  calculateTotalFails,
} from '../../services/stats.service'
import { SUCCESS_STREAK_COLOR, SUCCESS_FINISH_COLOR, FAIL_STREAK_COLOR } from '../../consts/consts'

import PieComponent from './PieComponent'
import BarChartComponent from './BarChartComponent'

const Dasboard: FunctionComponent = () => {
	const habits = useAppSelector((state) => state.habits)

	const totalSuccesses = calculateTotalSuccesses(habits)
  const totalFails = calculateTotalFails(habits)
	const mostSuccessfulHabit = calculateMostSuccessfulHabit(habits)
	const successFailRatio = calculateSuccessesFailRatio(habits)

  const smallestSuccessHabit = calculateSmallestSuccessesHabit(habits)
  const mostSuccessHabit = calculateMostSuccessesHabit(habits)
  const averageSuccesses = calculateAverageSuccesses(habits)

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
    {name: 'Smallest streak', Successes: smallestSuccessHabit},
    {name: 'Average streak', Successes: averageSuccesses},
    {name: 'Biggest streak', Successes: mostSuccessHabit}
	]

	return (
		<>
			<h3>Dashboard</h3>
			<p>Total successes : {totalSuccesses}</p>
      <p>Total fails : {totalFails}</p>
			<p>Most successful habit : {mostSuccessfulHabit} successes</p>
			<p>Win/Lose ratio : {successFailRatio} %</p>
			<p>Number of habits : {habits.length}</p>
      <p>No streak: {noStreakHabits}</p>
      <p>Success Streak : {successStreakHabits}</p>
      <p>Fail streak : {failStreakHabits}</p>
      <p>Solidified : {solidifiedHabits}</p>
      <p>Least Successes Habit : {smallestSuccessHabit}</p>
      <p>Most Successes Habit : {mostSuccessHabit}</p>
      <p>Average Successes : {averageSuccesses}</p>
      
      <PieComponent data={pieData} colors={pieColors} />
      <BarChartComponent data={barData}/>
      
		</>
	)
}

export default Dasboard
