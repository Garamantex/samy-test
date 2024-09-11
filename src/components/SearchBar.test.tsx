/**
 * This test file is testing the functionality of the SearchBar component.
 *
 * The first test case checks if the input element with the placeholder text is rendered correctly.
 *
 * The second test case checks if the handleSearch function is called when the input value changes.
 *
 * The third test case checks if the search term is displayed correctly in the input element.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar Component', () => {
  test('renders input with placeholder text', () => {
    render(<SearchBar searchTerm="" handleSearch={() => {}} />)
    const inputElement = screen.getByPlaceholderText(
      "You're looking for something?"
    )
    expect(inputElement).toBeInTheDocument()
  })

  test('calls handleSearch on input change', () => {
    const handleSearchMock = jest.fn()
    render(<SearchBar searchTerm="" handleSearch={handleSearchMock} />)
    const inputElement = screen.getByPlaceholderText(
      "You're looking for something?"
    )

    fireEvent.change(inputElement, { target: { value: 'test' } })
    expect(handleSearchMock).toHaveBeenCalledTimes(1)
  })

  test('displays the correct search term', () => {
    render(<SearchBar searchTerm="test" handleSearch={() => {}} />)
    const inputElement = screen.getByPlaceholderText(
      "You're looking for something?"
    )
    expect(inputElement).toHaveValue('test')
  })
})
