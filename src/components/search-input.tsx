import React, { FunctionComponent, useCallback } from "react"

export interface SearchInputProps {
  onSearch(search: string): void
}

const SearchInput: FunctionComponent<SearchInputProps> = ({ onSearch }) => {
  const _onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.currentTarget.value),
    [onSearch]
  )

  return (
    <input
      data-testid="github-search-input"
      placeholder="Search for someone..."
      className="border focus:outline-none focus:shadow-outline rounder border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full lg:w-2/3"
      onInput={_onSearch}
    />
  )
}

export default SearchInput
