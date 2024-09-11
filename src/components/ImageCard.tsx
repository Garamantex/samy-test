/**
 * Component that renders an image card.
 *
 * @component
 * @example
 * ```tsx
 * <ImageCard
 *   images={images}
 *   handleLike={handleLike}
 *   loadingLike={loadingLike}
 *   loading={loading}
 *   isEnd={isEnd}
 * />
 * ```
 *
 * @param {Object[]} images - An array of card content objects.
 * @param {number} images[].id - The unique identifier of the image.
 * @param {string} images[].title - The title of the image.
 * @param {string} images[].author - The author of the image.
 * @param {string} images[].main_attachment.small - The URL of the small version of the image.
 * @param {boolean} images[].liked - Indicates whether the image is liked or not.
 * @param {number} images[].likes_count - The number of likes for the image.
 * @param {Function} handleLike - A function to handle the like action for an image.
 * @param {number | null} loadingLike - The ID of the image that is currently being liked, or null if no image is being liked.
 * @param {boolean} loading - Indicates whether images are being loaded or not.
 * @param {boolean} isEnd - Indicates whether there are more images to load or not.
 *
 * @returns {JSX.Element} The rendered image card component.
 */
import React from 'react'
import { CardContent } from '../api/getImages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateLeft,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'

interface ImageCardProps {
  images: CardContent[]
  handleLike: (id: number) => void
  loadingLike: number | null
  loading: boolean
  isEnd: boolean
}

const ImageCard: React.FC<ImageCardProps> = ({
  images,
  handleLike,
  loadingLike,
  loading,
  isEnd,
}) => {
  return (
    <>
      <div className="bg-[#f5f5f5] py-10 sm:px-12">
        <div className="container mx-auto max-w-7xl px-8">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {images.map((image) => (
              <li className="relative overflow-hidden bg-white" key={image.id}>
                <div className="group relative">
                  <img
                    className="w-full"
                    src={image.main_attachment.small}
                    alt={image.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
                    className="flex w-1/2 flex-row-reverse items-center justify-center border p-5 font-opensans text-2xl text-gray-600 sm:mb-5 sm:w-auto sm:flex-col sm:border-none sm:p-0 sm:text-white"
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
                  <button className="flex w-1/2 items-center justify-center border p-5 font-opensans text-2xl text-slate-600 sm:w-auto sm:flex-col sm:border-none sm:p-0 sm:text-white">
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
          {loading && (
            <p className="mt-4 text-center font-semibold text-gray-500">
              Loading more images...
            </p>
          )}
          {isEnd && (
            <p className="mt-4 text-center font-semibold text-gray-500">
              No more images to load.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default ImageCard
