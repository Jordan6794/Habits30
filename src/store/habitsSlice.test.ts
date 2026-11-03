import { mockHabit } from '../components/Main/Table/habits.model'
import { FAIL_COLOR, SUCCESS_COLOR, UNKNOWN_COLOR } from '../consts/consts'
import reducer, { habitsActions } from './habitsSlice'

const today = '2026-11-03'

describe('Habits reducer', () => {
    
    test('initial state should be an empty array', () => {
        expect(reducer(undefined, { type: undefined })).toEqual([])
    })
    
    test('add a success on an empty record should return one success', () => {
        const habitsArray = reducer([mockHabit], habitsActions.setDayStatus({index: 0, date: today, status: 'success', todayKey: today}))
    
        expect(habitsArray[0].colors).toEqual([UNKNOWN_COLOR, UNKNOWN_COLOR, SUCCESS_COLOR])
        expect(habitsArray[0].log).toEqual({[today]: 'success'})
    })
    
    test('add a fail on an empty record should return one fail', () => {
        const habit = {...mockHabit, createdOn: today, startDate: today}
        const habitsArray = reducer([habit], habitsActions.setDayStatus({index: 0, date: today, status: 'fail', todayKey: today}))
    
        expect(habitsArray[0].colors).toEqual([FAIL_COLOR])
    })

    test('clicking twice on the same day keeps one result for that day', () => {
        const habit = {...mockHabit, createdOn: today, startDate: today}
        let habitsArray = reducer([habit], habitsActions.setDayStatus({index: 0, date: today, status: 'success', todayKey: today}))
        habitsArray = reducer(habitsArray, habitsActions.setDayStatus({index: 0, date: today, status: 'success', todayKey: today}))
        habitsArray = reducer(habitsArray, habitsActions.setDayStatus({index: 0, date: today, status: 'fail', todayKey: today}))

        expect(habitsArray[0].colors).toEqual([FAIL_COLOR])
        expect(habitsArray[0].lifetimeSuccessCounter).toBe(0)
        expect(habitsArray[0].lifetimeFailCounter).toBe(1)
    })

    test('undo and redo go back and forth between the session actions', () => {
        const habit = {...mockHabit, createdOn: today, startDate: today}
        let habitsArray = reducer([habit], habitsActions.setDayStatus({index: 0, date: today, status: 'success', todayKey: today}))
        habitsArray = reducer(habitsArray, habitsActions.setDayStatus({index: 0, date: today, status: 'fail', todayKey: today}))

        habitsArray = reducer(habitsArray, habitsActions.undoColors({index: 0, todayKey: today}))
        expect(habitsArray[0].log).toEqual({[today]: 'success'})

        habitsArray = reducer(habitsArray, habitsActions.undoColors({index: 0, todayKey: today}))
        expect(habitsArray[0].log).toEqual({})

        habitsArray = reducer(habitsArray, habitsActions.redoColors({index: 0, todayKey: today}))
        habitsArray = reducer(habitsArray, habitsActions.redoColors({index: 0, todayKey: today}))
        expect(habitsArray[0].log).toEqual({[today]: 'fail'})
    })

    test('clear resets the colors and lifetime counters but keeps the old log entries', () => {
        const habit = {...mockHabit, log: {'2026-11-01': 'success' as const, '2026-11-02': 'success' as const}}
        const habitsArray = reducer([habit], habitsActions.clearColors({index: 0, todayKey: today}))

        expect(habitsArray[0].colors).toEqual([])
        expect(habitsArray[0].lifetimeSuccessCounter).toBe(0)
        expect(habitsArray[0].startDate).toBe(today)
        expect(Object.keys(habitsArray[0].log)).toHaveLength(2)
    })

    test('set computes every habit, including habits saved before the daily log', () => {
        const legacyHabit = {name: 'Old habit', _id: 'old_id'}
        const habitsArray = reducer([], habitsActions.set({habits: [mockHabit, legacyHabit as any], todayKey: today}))

        expect(habitsArray[0].colors).toEqual([UNKNOWN_COLOR, UNKNOWN_COLOR])
        expect(habitsArray[1].colors).toEqual([])
        expect(habitsArray[1].log).toEqual({})
    })

    test('a new day marks the previous day without result as unknown and clears the undo history', () => {
        const habit = {...mockHabit, createdOn: today, startDate: today}
        let habitsArray = reducer([habit], habitsActions.setDayStatus({index: 0, date: today, status: 'success', todayKey: today}))
        habitsArray = reducer(habitsArray, habitsActions.refreshToday({todayKey: '2026-11-05'}))

        expect(habitsArray[0].colors).toEqual([SUCCESS_COLOR, UNKNOWN_COLOR])
        expect(habitsArray[0].historyStep).toBe(0)
    })
})
