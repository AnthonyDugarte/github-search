import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import faker from "faker"

import SearchInput from "../search-input"

const githubSearchInputTestId = "github-search-input"

/**
 * Simulate user input
 * @param value string to input
 */
function dispatchInputEntry(value: string): void {
  fireEvent.input(screen.getByTestId(githubSearchInputTestId), {
    target: { value: value },
  })
}

describe("Search Input component", () => {
  // Common vars to be used between tests
  let mockOnSearch, renderedSearchInput

  // Before each test we populate our rendered and mocked elements to be used at testing
  beforeEach(() => {
    mockOnSearch = jest.fn()
    renderedSearchInput = render(<SearchInput onSearch={mockOnSearch} />)
  })

  test("Matches snapshot", () => {
    expect(renderedSearchInput.asFragment()).toMatchSnapshot()
  })

  test("Shows correct searched text", () => {
    const search1 = faker.name.firstName()
    dispatchInputEntry(search1)
    expect(screen.getByTestId(githubSearchInputTestId)).toHaveValue(search1)
    expect(mockOnSearch.mock.calls[0]?.[0]).toBe(search1)

    const search2 = faker.name.firstName()
    dispatchInputEntry(search2)
    expect(screen.getByTestId(githubSearchInputTestId)).toHaveValue(search2)
    expect(mockOnSearch.mock.calls[1]?.[0]).toBe(search2)
  })
})
