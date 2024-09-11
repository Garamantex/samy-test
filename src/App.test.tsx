import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { useFetchImages } from './hooks/useFetchImages'
import { useLikeImage } from './hooks/useLikeImage'

// Mock the custom hooks
jest.mock('./hooks/useFetchImages')
jest.mock('./hooks/useLikeImage')

describe('App Component', () => {
  it('renders loading state initially', () => {
    ;(useFetchImages as jest.Mock).mockReturnValue({
      images: [],
      allImages: [],
      loading: true,
      error: null,
      isEnd: false,
      setImages: jest.fn(),
    })
    ;(useLikeImage as jest.Mock).mockReturnValue({
      handleLike: jest.fn(),
      loadingLike: false,
    })

    render(<App />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    ;(useFetchImages as jest.Mock).mockReturnValue({
      images: [],
      allImages: [],
      loading: false,
      error: { message: 'Failed to fetch images' },
      isEnd: false,
      setImages: jest.fn(),
    })
    ;(useLikeImage as jest.Mock).mockReturnValue({
      handleLike: jest.fn(),
      loadingLike: false,
    })

    render(<App />)
    expect(
      screen.getByText('Error: Failed to fetch images')
    ).toBeInTheDocument()
  })

  it('renders images when fetched', () => {
    ;(useFetchImages as jest.Mock).mockReturnValue({
      images: [
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
      ],
      allImages: [
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
      ],
      loading: false,
      error: null,
      isEnd: false,
      setImages: jest.fn(),
    })
    ;(useLikeImage as jest.Mock).mockReturnValue({
      handleLike: jest.fn(),
      loadingLike: false,
    })

    render(<App />)
    expect(screen.getByAltText('Sample Image 1')).toBeInTheDocument()
  })
})
