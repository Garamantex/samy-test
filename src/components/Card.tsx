import { useEffect, useState } from 'react'

// Define las interfaces para los datos que recibirás de la API
interface Image {
  type: string
  id: number
  title: string
  author: string
  created_at: string
  main_attachment: {
    big: string
    small: string
  }
  likes_count: number
  liked: boolean
  links: {
    rel: string
    uri: string
    methods: string
  }[]
}

interface Error {
  message: string
}

function App() {
  // Define los tipos de estado
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch('/api/images')
      .then((response) => response.json())
      .then((data: Image[]) => {
        setImages(data)
        setLoading(false)
      })
      .catch((error: Error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  const handleLike = (id: number) => {
    fetch(`/api/images/${id}/likes`, {
      method: 'POST',
    })
      .then(() => {
        // Actualiza el estado después de dar like si es necesario
      })
      .catch((error: Error) => console.error('Error liking image:', error))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
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
    </div>
  )
}

export default App
