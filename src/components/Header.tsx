/**
 * Header component that displays a header section with a logo and a search bar.
 *
 * @component
 * @example
 * ```tsx
 * import React, { useState } from 'react'
 * import SearchBar from './SearchBar'
 * import { CardContent } from '../api/getImages'
 *
 * interface HeaderProps {
 *   setImages: React.Dispatch<React.SetStateAction<CardContent[]>>
 *   allImages: CardContent[]
 * }
 *
 * const Header: React.FC<HeaderProps> = ({ setImages, allImages }) => {
 *   // ... component implementation ...
 * }
 *
 * export default Header
 * ```
 */
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { CardContent } from '../api/getImages'

interface HeaderProps {
  setImages: React.Dispatch<React.SetStateAction<CardContent[]>>
  allImages: CardContent[]
}

const Header: React.FC<HeaderProps> = ({ setImages, allImages }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setSearchTerm(searchValue)

    if (searchValue.length === 0) {
      setImages(allImages)
    } else if (searchValue.length >= 3) {
      const filtered = allImages.filter((image) =>
        image.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setImages(filtered)
    } else {
      setImages(allImages)
    }
  }
  return (
    <header className="container mx-auto mb-8 flex max-w-7xl items-center justify-between px-5 pt-10 sm:px-12">
      <div className="flex items-center">
        <img className="h-24 w-24" src="./src/assets/logo.svg" alt="Logo" />
      </div>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
    </header>
  )
}

export default Header
