import { StoredHabit } from '../components/Main/Table/habits.model'
import { calculateDayCounts } from './stats.service'

const habits: StoredHabit[] = [
	{ name: 'a', _id: 'a', createdOn: '2026-11-01', startDate: '2026-11-01', log: { '2026-11-01': 'success', '2026-11-03': 'success' } },
	{ name: 'b', _id: 'b', createdOn: '2026-11-01', startDate: '2026-11-01', log: { '2026-11-01': 'fail' } },
	{ name: 'c', _id: 'c', createdOn: '2026-11-02', startDate: '2026-11-02', log: {} },
]

describe('Daily counts', () => {
	test('counts the win, fail and unknown habits of a day', () => {
		expect(calculateDayCounts(habits, '2026-11-01', '2026-11-03')).toEqual({ success: 1, fail: 1, unknown: 0 })
		expect(calculateDayCounts(habits, '2026-11-02', '2026-11-03')).toEqual({ success: 0, fail: 0, unknown: 3 })
	})

	test('today without result is not counted as unknown', () => {
		expect(calculateDayCounts(habits, '2026-11-03', '2026-11-03')).toEqual({ success: 1, fail: 0, unknown: 0 })
	})

	test('a deleted habit still counts before its deletion, and is never unknown after', () => {
		const deletedHabit: StoredHabit = {
			name: 'd', _id: 'd', createdOn: '2026-11-01', startDate: '2026-11-01', log: { '2026-11-01': 'success' }, deletedOn: '2026-11-02',
		}
		expect(calculateDayCounts([deletedHabit], '2026-11-01', '2026-11-03')).toEqual({ success: 1, fail: 0, unknown: 0 })
		expect(calculateDayCounts([deletedHabit], '2026-11-02', '2026-11-03')).toEqual({ success: 0, fail: 0, unknown: 0 })
	})
})
