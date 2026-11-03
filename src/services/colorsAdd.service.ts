import { FAIL_COLOR, FAIL_STREAK_COLOR, SUCCESS_COLOR, SUCCESS_FINISH_COLOR } from "../consts/consts"
import { colorCounter, firstKnownColor } from "./colorsChecks.service"


export function addFailColor(colors: string[]) {
    if (firstKnownColor(colors) === FAIL_STREAK_COLOR) {
        return [FAIL_STREAK_COLOR]
    } else {
        return [...colors, FAIL_COLOR]
    }
}

export function addSuccessColor(colors: string[]){
    const firstColor = firstKnownColor(colors)
    if (
        firstColor === FAIL_COLOR ||
        firstColor === FAIL_STREAK_COLOR
    ) {
        return [SUCCESS_COLOR]
    } else if (firstColor === SUCCESS_FINISH_COLOR) {
        const redCount = colorCounter(colors, FAIL_COLOR)
        if (redCount === 0) {
            return [SUCCESS_FINISH_COLOR]
        } else {
            return [...colors, SUCCESS_COLOR]
        }
    } else {
        return [...colors, SUCCESS_COLOR]
    }
}
