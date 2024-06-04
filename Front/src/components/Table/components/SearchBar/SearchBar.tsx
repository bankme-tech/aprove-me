import React, { useEffect, useState } from "react";

interface ISearchBarProps {
  onClean: () => void;
  onSearch: (query?: string) => void;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ onClean, onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>();

  const handleSearch = () => (searchValue ? onSearch(searchValue) : onClean());
  const onCleanSearch = () => {
    setSearchValue("");
    onClean();
  };

  useEffect(() => {
    if (searchValue === "" || searchValue === undefined || searchValue === null)
      onClean();
  }, [searchValue]);

  return (
    <div className="flex h-8 w-full flex-row items-center justify-between rounded-lg border border-blue-0 bg-white pr-4 shadow-sm shadow-blue-0/30">
      <input
        type="text"
        onChange={(e) => setSearchValue(e?.target?.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        value={searchValue}
        className="tag-p w-full truncate border-0 bg-transparent px-6 py-3 pr-10 text-blue-0 outline-none focus:outline-none"
        placeholder="Digite o que deseja encontrar"
      />

      <div className=" flex w-fit flex-row items-center gap-2">
        {searchValue && (
          <button
            onClick={onCleanSearch}
            className="tag-h5 w-28 cursor-pointer self-end truncate text-red-0 transition-colors duration-300 hover:opacity-50"
          >
            Limpar busca
          </button>
        )}

        <button
          onClick={handleSearch}
          className="cursor-pointer bg-white duration-300 hover:opacity-50"
        >
          <img
            src="/assets/SearchIcon.svg"
            className="w-5 border-0"
            alt="Search"
          />
        </button>
      </div>
    </div>
  );
};
