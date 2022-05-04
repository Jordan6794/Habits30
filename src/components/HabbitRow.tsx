import React, { useState, useEffect } from 'react'

import { updateHabit } from '../actions/habbits'
import { hasTooManyRedsConsecutive, hasTooManyReds, colorCounter } from '../services/colorsChecks.service'

function HabbitRow(props) {
	const [colors, setColors] = useState<string[]>([])
	const daysToValidateStep: number = 13
	const [previousArray, setPreviousArray] = useState<string[]>([])
	const [undidStreak, setUndidStreak] = useState(false)
	const [hasInitialized, setHasInitialized] = useState(false)
   const [haveColorsInitialized, setHaveColorsInitialized] = useState(false)

	useEffect(() => {
		setColors(props.habitObject.colors)
		setHasInitialized(true)
	}, [props.habitObject.colors])


	useEffect(() => {
		if (hasInitialized) {
         if(haveColorsInitialized){
            const { name, _id } = props.habitObject
            updateHabit({ name, _id, colors }).then((response) =>
               console.log('update : ', response)
            )
         } else {
            setHaveColorsInitialized(true)
         }
		}
	}, [colors])

	function handleClickedGood() {
		setColors((prevValue) => {
			if (prevValue[0] === 'r' || prevValue[0] === 'dr') {
				return ['g']
			} else if (prevValue[0] === 'f') {
				const redCount = colorCounter(prevValue, 'r')
				if (redCount === 0) {
					return ['f']
				} else {
					return [...prevValue, 'g']
				}
			} else {
				return [...prevValue, 'g'] // g = green = good
			}
		})
		greenStreakChecks()
	}

	function handleClickedBad() {
		setColors((prevValue) => {
			if (prevValue[0] === 'dr') {
				return ['dr']
			} else {
				return [...prevValue, 'r']
			} // r = red = bad
		})
		redStreakChecks()
	}

	function greenStreakChecks() {
		setColors((prevValue) => {
			const dgCount = colorCounter(prevValue, 'dg')
			const greenCount = colorCounter(prevValue, 'g')
			const fCount = colorCounter(prevValue, 'f')
			if (fCount === 0) {
				if (dgCount === 0) {
					if (greenCount >= daysToValidateStep) {
						setPreviousArray(prevValue)
						setUndidStreak(false)
						return ['dg']
					} else {
						return prevValue
					}
				} else if (dgCount === 1) {
					if (greenCount >= daysToValidateStep) {
						const redCount = colorCounter(prevValue, 'r')
						if (redCount === 0) {
							// if 0 fail upgrade to fg directly
							setPreviousArray(prevValue)
							setUndidStreak(false)
							return ['f']
						} else {
							setPreviousArray(prevValue)
							setUndidStreak(false)
							return ['dg', 'dg']
						}
					} else {
						return prevValue
					}
				} else if (dgCount === 2) {
					if (greenCount >= daysToValidateStep) {
						setPreviousArray(prevValue)
						setUndidStreak(false)
						return ['f'] // f = finished = Habbit validated
					} else {
						return prevValue
					}
				} else {
					console.log('dg count not in boundaries, dgCount : ' + dgCount)
					return prevValue
				}
			} else {
				const redCount = colorCounter(prevValue, 'r')
				if (greenCount > redCount * 3) {
					setPreviousArray(prevValue)
					setUndidStreak(false)
					return ['f']
				} else {
					return prevValue
				}
			}
		})
	}

	function redStreakChecks() {
		setColors((prevValue) => {
			//checking for 2 red consequtive or 3 reds in first 14 days : reset the habbits to 0
			if (hasTooManyRedsConsecutive(prevValue) || hasTooManyReds(prevValue)) {
				const fgCount = colorCounter(prevValue, 'f')
				if (fgCount === 1) {
					setPreviousArray(prevValue)
					console.log(`the previous array is ${previousArray}`)
					setUndidStreak(false)
					return ['dg']
				} else {
					setPreviousArray(prevValue)
					setUndidStreak(false)
					return ['dr'] // dr = darkred = streak of bad
				}
			} else {
				return prevValue
			}
		})
	}

	function handleDeleteButtonClick() {
		const id = props.index
		props.delete(id)
	}

	function handleClearButtonClick() {
		setColors([])
	}

	function undoButton() {
		setColors((prevValue) => {
			const lastIndex = prevValue.length - 1
			if (
				prevValue[lastIndex] === 'dg' ||
				prevValue[lastIndex] === 'dr' ||
				prevValue[lastIndex] === 'f'
			) {
				if (!undidStreak) {
					setUndidStreak(true)
					return previousArray.filter((prevValue, index) => {
						const lastPreviousIndex = previousArray.length - 1
						return index !== lastPreviousIndex
					})
				} else {
					return prevValue // if we already undid one streak we don't do anything
				}
			} else {
				return prevValue.filter((prevValue, index) => {
					return index !== lastIndex
				})
			}
		})
	}

	function putColors(color: string, index: number) {
		return (
			<th
				key={index}
				// @ts-ignore
				bgcolor={
					color === 'g'
						? 'green'
						: color === 'dg'
						? 'darkgreen'
						: color === 'f'
						? 'lightgreen'
						: color === 'r'
						? 'red'
						: color === 'dr'
						? 'darkred'
						: ''
				}
			></th>
		)
	}

	return (
		<tr>
			<th>
				<button onClick={handleClearButtonClick}>Clear</button>{' '}
				<button onClick={handleDeleteButtonClick}>Delete</button>
				<span>{props.name}</span>
				<button onClick={handleClickedGood}>+</button>{' '}
				<button onClick={handleClickedBad}>-</button>
			</th>
			{colors.map(putColors)}
			<th>
				<button onClick={undoButton}>Undo</button>
			</th>
		</tr>
	)
}

export default HabbitRow
