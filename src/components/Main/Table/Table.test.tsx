import { screen } from '@testing-library/react'
import { render } from 'test-utils'

import Table from './Table'

test('"Habits" text appear on Table component', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

    render(<Table />)

    const habitsTextElement = screen.queryAllByText(/habits/i)
    expect(habitsTextElement).not.toHaveLength(0)
})