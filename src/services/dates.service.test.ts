import { addDays, getTodayKey, toDateKey } from './dates.service'

describe('Dates', () => {
	test('clicks before 3:30 AM count for the previous day', () => {
		expect(getTodayKey(new Date(2026, 10, 3, 1, 0))).toBe('2026-11-02')
		expect(getTodayKey(new Date(2026, 10, 3, 3, 29))).toBe('2026-11-02')
		expect(getTodayKey(new Date(2026, 10, 3, 3, 30))).toBe('2026-11-03')
		expect(getTodayKey(new Date(2026, 10, 3, 23, 59))).toBe('2026-11-03')
	})

	test('addDays moves across months and years', () => {
		expect(addDays('2026-10-31', 1)).toBe('2026-11-01')
		expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
		expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
	})

	test('toDateKey uses the local date', () => {
		expect(toDateKey(new Date(2026, 0, 5, 0, 10))).toBe('2026-01-05')
	})
})
