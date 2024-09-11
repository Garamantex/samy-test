// __tests__/ImageCard.test.tsx
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

    // Check if image elements are in the document
    mockImages.forEach((image) => {
      expect(screen.getByAltText(image.title)).toBeInTheDocument()
    })
  })

  test('handles like button click', () => {
    render(<ImageCard {...props} />)

    // Click on the like button of the first image
    fireEvent.click(screen.getAllByRole('button')[0])

    // Check if the mockHandleLike function was called with the correct image id
    expect(mockHandleLike).toHaveBeenCalledWith(mockImages[0].id)
  })

  test('displays loading and end messages correctly', () => {
    // Test with loading true
    render(<ImageCard {...{ ...props, loading: true }} />)
    expect(screen.getByText('Loading more images...')).toBeInTheDocument()

    // Test with isEnd true
    render(<ImageCard {...{ ...props, isEnd: true }} />)
    expect(screen.getByText('No more images to load.')).toBeInTheDocument()
  })
})
