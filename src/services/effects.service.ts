import { NUMBER_OF_DAYS, NUMBER_OF_DAYS_MOBIL } from "../consts/consts";

export function makeDaysArray(daysArray: number[]) {
    const isMobileScreen = window.matchMedia("(max-width: 700px)").matches
    const numberOfDays = isMobileScreen ? NUMBER_OF_DAYS_MOBIL : NUMBER_OF_DAYS

    for (let i = 1; i <= numberOfDays ; i++) {
        daysArray.push(i)
    }
}