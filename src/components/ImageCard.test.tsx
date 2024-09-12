/**
 * This file contains the unit tests for the ImageCard component.
 * The ImageCard component is responsible for rendering images and handling like button clicks.
 * It receives an array of images, a function to handle likes, loading state, and end state as props.
 * The tests in this file ensure that the component renders images correctly, handles like button clicks,
 * and displays loading and end messages correctly.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ImageCard from '../components/ImageCard'
import { CardContent } from '../api/getImages'

// Mock data for the test
const mockImages: CardContent[] = [
  {
    id: 1,
    title: 'Sample Image 1',
    author: 'Author 1',
    main_attachment: {
      small: 'http://example.com/image1.jpg',
      big: 'http://example.com/image1.jpg',
    },
    liked: false,
    likes_count: 10,
    type: '',
    created_at: '',
    links: [],
  },
]

// Mock function for handling likes
const mockHandleLike = jest.fn()

// Setup initial props
const props = {
  images: mockImages,
  handleLike: mockHandleLike,
  loadingLike: null,
  loading: false,
  isEnd: false,
}

describe('ImageCard Component', () => {
  test('renders images correctly', () => {
    render(<ImageCard {...props} />)

    mockImages.forEach((image) => {
      expect(screen.getByAltText(image.title)).toBeInTheDocument()
    })
  })

  test('handles like button click', () => {
    render(<ImageCard {...props} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(mockHandleLike).toHaveBeenCalledWith(mockImages[0].id)
  })

  test('displays loading and end messages correctly', () => {
    render(<ImageCard {...{ ...props, loading: true }} />)
    expect(screen.getByText('Loading more images...')).toBeInTheDocument()

    render(<ImageCard {...{ ...props, isEnd: true }} />)
    expect(screen.getByText('No more images to load.')).toBeInTheDocument()
  })
})
