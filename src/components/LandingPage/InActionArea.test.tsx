import { screen } from '@testing-library/react'
import { render } from "../../shared/test-utils"

import InActionArea from './InActionArea'

test('renders "habits30" on In Action Component', () => {
    render(<InActionArea />);
    const appTitleElement = screen.getByText(/habits30/i);
    expect(appTitleElement).toBeInTheDocument()
})