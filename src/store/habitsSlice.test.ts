import { mockHabit } from '../components/Main/Table/habits.model'
import { FAIL_COLOR, SUCCESS_COLOR } from '../consts/consts'
import reducer, { habitsActions } from './habitsSlice'

describe('Habits reducer', () => {
    
    test('initial state should be an empty array', () => {
        expect(reducer(undefined, { type: undefined })).toEqual([])
    })
    
    test('add a success on an empty record should return one success', () => {
        const testHabit = mockHabit
        const habitsArray = reducer([testHabit], habitsActions.addSuccessColor({index: 0}))
    
        expect(habitsArray[0].colors).toEqual([SUCCESS_COLOR])
    })
    
    test('add a fail on an empty record should return one fail', () => {
        const testHabit = mockHabit
        const habitsArray = reducer([testHabit], habitsActions.addFailColor({index: 0}))
    
        expect(habitsArray[0].colors).toEqual([FAIL_COLOR])
    })
})

