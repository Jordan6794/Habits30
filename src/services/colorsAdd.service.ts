import { FAIL_COLOR, FAIL_STREAK_COLOR, SUCCESS_COLOR, SUCCESS_FINISH_COLOR } from "../consts/consts"
import { colorCounter } from "./colorsChecks.service"


export function addFailColor(colors: string[]) {
    if (colors[0] === FAIL_STREAK_COLOR) {
        return [FAIL_STREAK_COLOR]
    } else {
        return [...colors, FAIL_COLOR]
    }
}

export function addSuccessColor(colors: string[]){
    if (
        colors[0] === FAIL_COLOR ||
        colors[0] === FAIL_STREAK_COLOR
    ) {
        return [SUCCESS_COLOR]
    } else if (colors[0] === SUCCESS_FINISH_COLOR) {
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