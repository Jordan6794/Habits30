import React, { useState, useEffect } from 'react'

import HabitCell from './HabitCell'

import {
	FAIL_COLOR,
	SUCCESS_COLOR,
	SUCCESS_FINISH_COLOR,
	SUCCESS_STREAK_COLOR,
	FAIL_STREAK_COLOR,
	DAYS_TO_VALIDATE_STEP,
} from '../../consts/consts'
import { updateHabit } from '../../actions/habits'
import {
	hasTooManyRedsConsecutive,
	hasTooManyReds,
	colorCounter,
} from '../../services/colorsChecks.service'
import { addFailColor, addSuccessColor } from '../../services/colorsAdd.service'

function HabitRow(props) {
	//? useless security to put empy values in all if no value (which should never hapen) ?
	const [colors, setColors] = useState<string[]>(
		props.habitObject?.colors || []
	)
	const [successCounter, setSuccessCounter] = useState<number>(
		props.habitObject?.successCounter || 0
	)
	const [failCounter, setFailCounter] = useState<number>(
		props.habitObject?.failCounter || 0
	)
	const [previousArrays, setPreviousArrays] = useState<string[][]>(
		props.habitObject?.previousArrays || []
	)
	const [hasInitialized, setHasInitialized] = useState(false)

	useEffect(() => {
		if (hasInitialized) {
			const { name, _id } = props.habitObject

			updateHabit({
				name,
				_id,
				colors,
				successCounter,
				failCounter,
				previousArrays,
			}).then((response) => console.log('update : ', response))
		} else {
			setHasInitialized(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colors, props.habitObject])

	function handleClickedGood() {
		setColors((prevValue) => {
			const newColors = greenStreakChecks(addSuccessColor(prevValue))
			const newFailCount = colorCounter(newColors, FAIL_COLOR)
			setFailCounter(newFailCount)
			return newColors
		})

		setSuccessCounter((prevValue) => prevValue + 1)
	}

	function handleClickedBad() {
		setColors((prevValue) => {
			const newColors = redStreakChecks(addFailColor(prevValue))
			const newSuccessCount = calculateGreenCount(newColors)
			setSuccessCounter(newSuccessCount)
			return newColors
		})

		setFailCounter((prevCounter) => prevCounter + 1)
	}

	function calculateGreenCount(colors: string[]) {
		if (colorCounter(colors, SUCCESS_FINISH_COLOR) === 1) {
			return successCounter
		} else if (colorCounter(colors, SUCCESS_STREAK_COLOR) === 0) {
			return colorCounter(colors, SUCCESS_COLOR)
		} else {
			const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
			const successCount = colorCounter(colors, SUCCESS_COLOR)
			return successStreakCount * DAYS_TO_VALIDATE_STEP + successCount
		}
	}

	function redStreakChecks(colors: string[]) {
		if (hasTooManyRedsConsecutive(colors) || hasTooManyReds(colors)) {
			const successFinishCount = colorCounter(colors, SUCCESS_FINISH_COLOR)
			if (successFinishCount === 1) {
				setPreviousArrays([...previousArrays, colors])

				return [SUCCESS_STREAK_COLOR]
			} else {
				setPreviousArrays([...previousArrays, colors])

				return [FAIL_STREAK_COLOR]
			}
		} else {
			return colors
		}
	}

	function greenStreakChecks(colors: string[]) {
		const successStreakCount = colorCounter(colors, SUCCESS_STREAK_COLOR)
		const successCount = colorCounter(colors, SUCCESS_COLOR)
		const successFinishCount = colorCounter(colors, SUCCESS_FINISH_COLOR)
		if (successFinishCount === 0) {
			if (successStreakCount === 0) {
				if (successCount >= DAYS_TO_VALIDATE_STEP) {
					setPreviousArrays([...previousArrays, colors])

					return [SUCCESS_STREAK_COLOR]
				} else {
					return colors
				}
			} else if (successStreakCount === 1) {
				if (successCount >= DAYS_TO_VALIDATE_STEP) {
					const redCount = colorCounter(colors, FAIL_COLOR)
					if (redCount === 0) {
						// if 0 fail upgrade to finish color directly
						setPreviousArrays([...previousArrays, colors])

						return [SUCCESS_FINISH_COLOR]
					} else {
						setPreviousArrays([...previousArrays, colors])

						return [SUCCESS_STREAK_COLOR, SUCCESS_STREAK_COLOR]
					}
				} else {
					return colors
				}
			} else if (successStreakCount === 2) {
				if (successCount >= DAYS_TO_VALIDATE_STEP) {
					setPreviousArrays([...previousArrays, colors])

					return [SUCCESS_FINISH_COLOR]
				} else {
					return colors
				}
			} else {
				console.log(
					'dg count not in boundaries, successStreakCount : ' +
						successStreakCount
				)

				return colors
			}
		} else {
			const failCount = colorCounter(colors, FAIL_COLOR)
			if (successCount > failCount * 3) {
				setPreviousArrays([...previousArrays, colors])

				return [SUCCESS_FINISH_COLOR]
			} else {
				return colors
			}
		}
	}

	function handleDeleteButtonClick() {
		const id = props.index
		props.delete(id)
	}

	function handleClearButtonClick() {
		setColors([])
		setSuccessCounter(0)
		setFailCounter(0)
		setPreviousArrays([])
	}

	function undoButton() {
		// updating success and fail counters
		if (
			previousArrays.length > 0 &&
			previousArrays[previousArrays.length - 1][0] === SUCCESS_FINISH_COLOR
		) {
			setSuccessCounter(25)
			setFailCounter(
				colorCounter(previousArrays[previousArrays.length - 1], FAIL_COLOR)
			)
		} else {
			const previousArray = previousArrays[previousArrays.length - 1]
			const lastColor = colors[colors.length - 1]
			switch (lastColor) {
				case SUCCESS_COLOR:
					setSuccessCounter((prevValue) => prevValue - 1)
					break
				case FAIL_COLOR:
					setFailCounter((prevValue) => prevValue - 1)
					break
				case SUCCESS_STREAK_COLOR:
					setSuccessCounter((prevValue) => prevValue - 1)
					setFailCounter(colorCounter(previousArray, FAIL_COLOR))
					break
				case FAIL_STREAK_COLOR:
					setFailCounter((prevValue) => prevValue - 1)
					setSuccessCounter(calculateGreenCount(previousArray))
					break
				case SUCCESS_FINISH_COLOR:
					setSuccessCounter((prevValue) => prevValue - 1)
					setFailCounter(colorCounter(previousArray, FAIL_COLOR))
					break
			}
		}

		setColors((prevValue) => {
			const lastIndex = prevValue.length - 1
			if (
				prevValue[lastIndex] === SUCCESS_STREAK_COLOR ||
				prevValue[lastIndex] === FAIL_STREAK_COLOR ||
				prevValue[lastIndex] === SUCCESS_FINISH_COLOR
			) {
				if (previousArrays.length > 0) {
					const previousArray = previousArrays[previousArrays.length - 1]
					setPreviousArrays(
						previousArrays.filter((array, index) => {
							return index !== previousArrays.length - 1
						})
					)
					return previousArray.filter((prevValue, index) => {
						const lastPreviousIndex = previousArray.length - 1
						return index !== lastPreviousIndex
					})
				} else {
					return prevValue
				}
			} else {
				return prevValue.filter((prevValue, index) => {
					return index !== lastIndex
				})
			}
		})
	}

	const colorsCells = colors.map((color, index) => (
		<HabitCell key={index} color={color} index={index} />
	))

	const streakCounterDisplay =
		successCounter >= failCounter ? (
			<p className="green-counter">({successCounter})</p>
		) : (
			<p className="red-counter">({failCounter})</p>
		)

	return (
		<tr className="habit-row">
			<th className="habit-row-infos">
				<div className="th-undo-clear-div">
					<button className="btn-icon" onClick={handleDeleteButtonClick}>
						<i className="fa-solid fa-trash"></i>
					</button>
					<button className="btn-icon" onClick={handleClearButtonClick}>
						<i className="fa-solid fa-broom"></i>
					</button>{' '}
				</div>

				<p className="th-habit-name">{props.name}</p>

				
				<div className="th-plus-minus-div">
					{streakCounterDisplay}
					<button
						className="btn-icon btn-plus"
						onClick={handleClickedGood}
					>
						<i className="fa-solid fa-plus"></i>
					</button>{' '}
					<button
						className="btn-icon btn-minus"
						onClick={handleClickedBad}
					>
						<i className="fa-solid fa-plus"></i>
					</button>
				</div>
			</th>
			{colorsCells}
			<th className="th-undo-btn">
				<button className="btn-icon btn-undo" onClick={undoButton}>
					<i className="fa-solid fa-rotate-left"></i>
				</button>
			</th>
		</tr>
	)
}

export default HabitRow
