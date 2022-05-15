import {
	FAIL_COLOR,
	SUCCESS_COLOR,
	SUCCESS_FINISH_COLOR,
	SUCCESS_STREAK_COLOR,
	FAIL_STREAK_COLOR,
} from '../../consts/consts'

export default function HabitCell({color, index}: {color: string, index: number}) {
    return (
        <th
            // @ts-ignore
            bgcolor={
                color === SUCCESS_COLOR
                    ? 'green'
                    : color === SUCCESS_STREAK_COLOR
                    ? 'darkgreen'
                    : color === SUCCESS_FINISH_COLOR
                    ? 'lightgreen'
                    : color === FAIL_COLOR
                    ? 'red'
                    : color === FAIL_STREAK_COLOR
                    ? 'darkred'
                    : ''
            }
        ></th>
    )
}