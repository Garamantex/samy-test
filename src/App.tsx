/**
 * The main component of the application.
 * Renders the header and image card components.
 *
 * @returns The rendered JSX elements.
 */
import React from 'react'
import Header from './components/Header'
import ImageCard from './components/ImageCard'
import { useFetchImages } from './hooks/useFetchImages'
import { useLikeImage } from './hooks/useLikeImage'

function App() {
  const { images, allImages, loading, error, isEnd, setImages } =
    useFetchImages(1)
  const { handleLike, loadingLike } = useLikeImage(images, setImages)

  if (loading && images.length === 0) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Header setImages={setImages} allImages={allImages} />
      <ImageCard
        images={images}
        handleLike={handleLike}
        loadingLike={loadingLike}
        loading={loading}
        isEnd={isEnd}
      />
    </>
  )
}

export default App
