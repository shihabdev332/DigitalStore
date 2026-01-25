import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Handle search logic
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch(""); // clear input after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex-1 h-10 relative max-w-md">
      <input
        type="text"
        placeholder="Search your product..."
        className="w-full h-full border border-gray-300 rounded-full outline-none text-zinc-700 pl-5 pr-12 focus:border-zinc-800 transition-all shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {/* Clear Button */}
        {search && (
          <IoMdClose
            onClick={() => setSearch("")}
            className="text-gray-400 hover:text-zinc-800 cursor-pointer text-lg"
          />
        )}
        
        {/* Search Icon Separator (Optional) */}
        {search && <span className="h-4 w-[1px] bg-gray-300"></span>}

        {/* Search Button */}
        <IoSearchSharp
          onClick={handleSearch}
          className="text-gray-500 hover:text-zinc-900 cursor-pointer text-xl transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchInput;