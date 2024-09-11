/**
 * Custom hook for handling image likes.
 *
 * @param images - The array of card content representing the images.
 * @param setImages - The state setter function for updating the images.
 * @returns An object containing the handleLike function, loadingLike state, and error state.
 */
import { useState } from 'react'
import { CardContent } from '../api/getImages'
import { likeImage } from '../api/likeImage'

export const useLikeImage = (
  images: CardContent[],
  setImages: React.Dispatch<React.SetStateAction<CardContent[]>>
) => {
  const [loadingLike, setLoadingLike] = useState<number | null>(null)
  const [error, setError] = useState<Error | null>(null)

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
      setError(error as Error)
    } finally {
      setLoadingLike(null)
    }
  }

  return { handleLike, loadingLike, error }
}
