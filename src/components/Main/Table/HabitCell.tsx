import { FAIL_COLOR, SUCCESS_COLOR, SUCCESS_FINISH_COLOR, SUCCESS_STREAK_COLOR, FAIL_STREAK_COLOR } from '../../../consts/consts'

import CheckSVG from './SVG/CheckSVG'
import CheckCircleSVG from './SVG/CheckCircleSVG'
import CheckShieldSVG from './SVG/CheckShieldSVG'
import XSVG from './SVG/XSVG'
import XCircleSVG from './SVG/XCircleSVG'

export default function HabitCell({
	color,
	index,
	lastIndex,
}: {
	color: string
	index: number
	lastIndex: number
}) {
	let content
	switch (color) {
		case SUCCESS_COLOR:
			content = <CheckSVG />
			break
		case SUCCESS_STREAK_COLOR:
			content = <CheckCircleSVG />
			break
		case SUCCESS_FINISH_COLOR:
			content = <CheckShieldSVG />
			break
		case FAIL_COLOR:
			content = <XSVG />
			break
		case FAIL_STREAK_COLOR:
			content = <XCircleSVG />
			break
	}

	return (
		<th className={`habitCell`}>
			<div className="center-container">{content}</div>
		</th>
	)
}