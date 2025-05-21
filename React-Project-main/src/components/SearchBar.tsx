// src/components/navbar/SearchBar.tsx
import { TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onChange,
  className = "w-full",
}) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
      <TextInput
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={onChange}
        className={className}
        rightIcon={FaSearch}
      />
    </div>
  );
};

export default SearchBar;
