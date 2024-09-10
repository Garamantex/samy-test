import { useEffect, useState } from 'react'
import { getImages, CardContent } from './api/getImages'
import { likeImage } from './api/likeImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateLeft,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header'
import ImageCard from './components/ImageCard'

function App() {
  const [images, setImages] = useState<CardContent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [loadingLike, setLoadingLike] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [allImages, setAllImages] = useState<CardContent[]>([])

  const getImagesFromApi = (page: number) => {
    setLoading(true)
    getImages(page, 6)
      .then((data) => {
        if (data.length === 0) {
          setIsEnd(true)
        } else {
          setImages((prevImages) => {
            const newImages = [...prevImages, ...data]
            const uniqueImages = Array.from(
              new Set(newImages.map((image) => image.id))
            ).map((id) => newImages.find((image) => image.id === id))
            return uniqueImages.filter(
              (image): image is CardContent => image !== undefined
            )
          })
          setAllImages((prevImages) => {
            const newAllImages = [...prevImages, ...data]
            const uniqueAllImages = Array.from(
              new Set(newAllImages.map((image) => image.id))
            ).map((id) => newAllImages.find((image) => image.id === id))
            return uniqueAllImages.filter(
              (image): image is CardContent => image !== undefined
            )
          })
        }
      })
      .catch((error: Error) => {
        setError(error as Error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getImagesFromApi(page)
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && !isEnd) {
          setPage((prevPage) => prevPage + 1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, isEnd])

  const handleLike = async (id: number) => {
    if (loadingLike === id) return

    setLoadingLike(id)
    try {
      const image = images.find((img) => img.id === id)
      if (!image) return

      const updatedImages = images.map((img) => {
        if (img.id === id) {
          return {
            ...img,
            liked: !img.liked,
            likes_count: img.liked ? img.likes_count - 1 : img.likes_count + 1,
          }
        }
        return img
      })

      await likeImage(id)
      setImages(updatedImages)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('Unknown error occurred'))
      }
    } finally {
      setLoadingLike(null)
    }
  }

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
