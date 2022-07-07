import { FAIL_COLOR, SUCCESS_COLOR, SUCCESS_FINISH_COLOR, SUCCESS_STREAK_COLOR, FAIL_STREAK_COLOR } from '../../../consts/consts'
import Check from './SVG/check.svg'
import CheckCircle from './SVG/check-circle.svg'
import CheckShield from './SVG/check-shield.svg'
import X from './SVG/x.svg'
import XCircle from './SVG/x-circle.svg'

export default function HabitCell({
	color,
	index,
	lastIndex,
	didChange,
}: {
	color: string
	index: number
	lastIndex: number
	didChange: boolean | undefined
}) {
	let content
	switch (color) {
		case SUCCESS_COLOR:
			content = <Check className="habitCellIcon successColor" />
			break
		case SUCCESS_STREAK_COLOR:
			content = <CheckCircle className="habitCellIcon successColor" />
			break
		case SUCCESS_FINISH_COLOR:
			content = <CheckShield className="habitCellIcon successColor" />
			break
		case FAIL_COLOR:
			content = <X className="habitCellIcon failColor" />
			break
		case FAIL_STREAK_COLOR:
			content = <XCircle className="habitCellIcon failColor" />
			break
	}
	const lastClass = didChange && index === lastIndex ? 'lastCellChanged' : ''

	return (
		<th className={`habitCell ${lastClass}`}>
			<div className="center-container">{content}</div>
		</th>
	)
}
