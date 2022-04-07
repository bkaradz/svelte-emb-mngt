/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import Index from '../routes/auth/signIn.svelte'
import { render, screen } from '@testing-library/svelte'

describe('Test of the Sign In page', () => {
  it('has Sign In header', () => {
    render(Index)
    const header = screen.getByRole('heading', { name: 'Sign In' })
    expect(header).toBeInTheDocument()
  })
})
