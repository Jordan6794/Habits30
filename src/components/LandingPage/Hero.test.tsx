import { screen } from "@testing-library/react";
import { render } from '../../shared/test-utils'

import Hero from "./Hero"

test('"Habits" appearing in the hero component', () => {
    render(<Hero />)

    const habitsTexts = screen.queryAllByText(/habits/i)
    expect(habitsTexts).not.toHaveLength(0)
})