/**
 * Component for rendering a search bar.
 *
 * @component
 * @example
 * ```tsx
 * import React from 'react';
 * import SearchBar from './SearchBar';
 *
 * const App: React.FC = () => {
 *   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
 *     // handle search logic
 *   };
 *
 *   return (
 *     <div>
 *       <SearchBar searchTerm="" handleSearch={handleSearch} />
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface SearchBarProps {
  searchTerm: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearch }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          className="rounded-full border border-gray-400 bg-[#f5f5f5] px-4 pl-10 placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  )
}

export default SearchBar
