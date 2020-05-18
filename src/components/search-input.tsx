import React, { FunctionComponent, useCallback } from "react"
import { DebounceInput } from "react-debounce-input"

export interface SearchInputProps {
  onSearch(search: string): void
}

const SearchInput: FunctionComponent<SearchInputProps> = ({ onSearch }) => {
  const _onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
    [onSearch]
  )

  return (
    <DebounceInput
      data-testid="github-search-input"
      placeholder="Search for someone..."
      className="-white shadow focus:outline-none focus:bg-gray-100 rounder border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full lg:w-2/3"
      minLength={1}
      debounceTimeout={275} // https://humanbenchmark.com/tests/reactiontime/statistics
      onChange={_onSearch}
    />
  )
}

export default SearchInput
