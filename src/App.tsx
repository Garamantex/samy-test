import { useEffect, useState } from 'react'
import { getImages, CardContent } from './api/getImages'
import { likeImage } from './api/likeImage'

function App() {
  // Define los tipos de estado
  const [images, setImages] = useState<CardContent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const getImagesFromApi = () => {
    getImages(1, 10)
      .then((data) => {
        setImages(data)
      })
      .catch((error: Error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getImagesFromApi()
  }, [])

  const handleLike = (id: number) => {
    likeImage(id).then(() => {
      getImagesFromApi()
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <h1>Images</h1>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <h2 className="text-xl">{image.title}</h2>
            <p>Author: {image.author}</p>
            <img src={image.main_attachment.small} alt={image.title} />
            <button onClick={() => handleLike(image.id)}>
              {image.liked ? 'Unlike' : 'Like'} ({image.likes_count})
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
