import { useState, useEffect } from 'react'
import { getImages, CardContent } from '../api/getImages'

export const useFetchImages = (initialPage: number = 1) => {
  const [images, setImages] = useState<CardContent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState<number>(initialPage)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [allImages, setAllImages] = useState<CardContent[]>([])

  const getImagesFromApi = (page: number) => {
    setLoading(true)
    const numImages = window.innerWidth >= 1024 ? 9 : 6
    getImages(page, numImages)
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
        setError(error)
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

  return { images, allImages, loading, error, page, setImages, isEnd }
}
