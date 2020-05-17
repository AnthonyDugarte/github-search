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

  test("Correctly debounce searching", async () => {
    const search1 = faker.name.firstName()

    // Dispatch simulation of input
    dispatchInputEntry(search1)

    // User should see what he is typing
    expect(screen.getByTestId(githubSearchInputTestId)).toHaveValue(search1)

    // No searching has been made yet, waiting for user to stop typing
    expect(mockOnSearch.mock.calls[0]).toBeUndefined()
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(mockOnSearch.mock.calls[0]).toBeUndefined()

    // "Wait" for user to stop typing
    await new Promise(resolve => setTimeout(resolve, 500))

    // A search should have been made
    expect(mockOnSearch.mock.calls[0]?.[0]).toBe(search1)

    // We are going to do another search
    const search2 = faker.name.firstName()
    dispatchInputEntry(search2)

    // User shuld see his search
    expect(screen.getByTestId(githubSearchInputTestId)).toHaveValue(search2)

    // But we should wait to see if he hasn't stop searching
    expect(mockOnSearch.mock.calls[1]).toBeUndefined()
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(mockOnSearch.mock.calls[1]).toBeUndefined()

    // User stoped typing for a while...
    await new Promise(resolve => setTimeout(resolve, 300))

    // Second search should have been made
    expect(mockOnSearch.mock.calls[1]?.[0]).toBe(search2)
  })
})
