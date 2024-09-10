import { useEffect, useState } from 'react'
import { getImages, CardContent } from './api/getImages'
import { likeImage } from './api/likeImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateLeft,
  faMagnifyingGlass,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'

function App() {
  const [images, setImages] = useState<CardContent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [loadingLike, setLoadingLike] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('') // Estado para el valor del input
  const [allImages, setAllImages] = useState<CardContent[]>([]) // Almacena todas las imágenes cargadas inicialmente

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setSearchTerm(searchValue)

    if (searchValue.length === 0) {
      setImages(allImages) // Restablece las imágenes cuando el campo está vacío
    } else if (searchValue.length >= 3) {
      const filtered = allImages.filter((image) =>
        image.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setImages(filtered)
    } else {
      setImages(allImages) // Restablece las imágenes cuando hay menos de 3 caracteres
    }
  }

  if (loading && images.length === 0) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <header className="container mx-auto mb-8 flex max-w-7xl items-center justify-between pt-10 sm:px-12">
        <div className="flex items-center">
          <img className="h-24 w-24" src="./src/assets/logo.svg" alt="Logo" />
        </div>
        <div className="flex items-center">
          <div className="relative">
            <input
              className="py- rounded-full border border-gray-400 bg-[#f5f5f5] px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="You're looking for something?"
              value={searchTerm}
              onChange={handleSearch} // Maneja el cambio de input
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
            />
          </div>
        </div>
      </header>
      <div className="bg-[#f5f5f5] py-10 sm:px-12">
        <div className="container mx-auto max-w-7xl px-4">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {images.map((image) => (
              <li className="relative overflow-hidden bg-white" key={image.id}>
                <div className="group relative">
                  <img
                    className="w-full"
                    src={image.main_attachment.small}
                    alt={image.title}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                <div className="absolute left-0 top-0 flex size-48 -translate-x-24 -translate-y-24 -rotate-45 transform items-end justify-center bg-white px-2 py-2 text-lg font-bold text-black">
                  <p className="rotate-45 transform p-4">35.00€</p>
                </div>

                <div className="pb-7 pt-5 text-center">
                  <h2 className="font-neustra text-3xl uppercase">
                    {image.title}
                  </h2>
                  <p className="font-droid text-lg font-semibold">
                    <span className="text-[#c3c3be]">by</span> {image.author}
                  </p>
                </div>

                <div className="relative flex sm:absolute sm:right-5 sm:top-5 sm:block">
                  <button
                    className="font-opensans flex w-1/2 flex-row-reverse items-center justify-center border p-5 text-2xl text-gray-600 sm:mb-5 sm:w-auto sm:flex-col sm:border-none sm:p-0 sm:text-white"
                    onClick={() => handleLike(image.id)}
                    disabled={loadingLike === image.id}
                  >
                    {image.liked ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-blue-700 sm:bg-white">
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white">
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </div>
                    )}{' '}
                    <p className="mr-5 text-gray-300 sm:mr-0 sm:text-white">
                      {String(image.likes_count).padStart(3, '0')}
                    </p>
                  </button>
                  <button className="font-opensans flex w-1/2 items-center justify-center border p-5 text-2xl text-slate-600 sm:w-auto sm:flex-col sm:border-none sm:p-0 sm:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white">
                      <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </div>
                    <p className="ml-5 text-gray-300 sm:ml-0 sm:text-white">
                      000
                    </p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {loading && <p>Loading more images...</p>}
          {isEnd && <p>No more images to load.</p>}
        </div>
      </div>
    </>
  )
}

export default App
