/**
 * @fileoverview This file contains the test cases for the Header component.
 * @module components/Header.test
 */

/**
 * Renders the Header component with a search bar and icon and verifies if they are displayed correctly.
 * @test
 */
it('renders correctly with a search bar and icon', () => {
  // Test implementation
})

/**
 * Filters the images based on the search input and verifies if the setImages function is called with the correct filtered images.
 * @test
 */
it('filters images based on search input', () => {
  // Test implementation
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { CardContent } from '../api/getImages'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid="search-icon" />,
}))

const mockImages: CardContent[] = [
  {
    id: 1,
    title: 'Image One',
    main_attachment: {
      big: 'image1.jpg',
      small: '',
    },
    type: '',
    author: '',
    created_at: '',
    likes_count: 0,
    liked: false,
    links: [],
  },
  {
    id: 2,
    title: 'Image Two',
    main_attachment: {
      big: 'image2.jpg',
      small: '',
    },
    type: '',
    author: '',
    created_at: '',
    likes_count: 0,
    liked: false,
    links: [],
  },
  {
    id: 3,
    title: 'Another Image',
    main_attachment: {
      big: 'image3.jpg',
      small: '',
    },
    type: '',
    author: '',
    created_at: '',
    likes_count: 0,
    liked: false,
    links: [],
  },
]

describe('Header Component', () => {
  it('renders correctly with a search bar and icon', () => {
    const setImagesMock = jest.fn()

    render(<Header setImages={setImagesMock} allImages={mockImages} />)

    const logo = screen.getByAltText('Logo')
    expect(logo).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText(
      "You're looking for something?"
    )
    expect(searchInput).toBeInTheDocument()

    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })

  it('filters images based on search input', () => {
    const setImagesMock = jest.fn() // Mock para setImages

    render(<Header setImages={setImagesMock} allImages={mockImages} />)

    const searchInput = screen.getByPlaceholderText(
      "You're looking for something?"
    )

    fireEvent.change(searchInput, { target: { value: 'Image' } })
    expect(setImagesMock).toHaveBeenCalledWith([
      {
        id: 1,
        title: 'Image One',
        author: '',
        created_at: '',
        liked: false,
        likes_count: 0,
        links: [],
        main_attachment: { big: 'image1.jpg', small: '' },
        type: '',
      },
      {
        id: 2,
        title: 'Image Two',
        author: '',
        created_at: '',
        liked: false,
        likes_count: 0,
        links: [],
        main_attachment: { big: 'image2.jpg', small: '' },
        type: '',
      },
      {
        id: 3,
        title: 'Another Image',
        author: '',
        created_at: '',
        liked: false,
        likes_count: 0,
        links: [],
        main_attachment: { big: 'image3.jpg', small: '' },
        type: '',
      },
    ])

    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } })
    expect(setImagesMock).toHaveBeenCalledWith([])

    fireEvent.change(searchInput, { target: { value: 'Im' } })
    expect(setImagesMock).toHaveBeenCalledWith(mockImages)

    fireEvent.change(searchInput, { target: { value: '' } })
    expect(setImagesMock).toHaveBeenCalledWith(mockImages)
  })
})
