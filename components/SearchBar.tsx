// src/components/SearchBar.tsx

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}