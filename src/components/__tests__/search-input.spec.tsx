import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import faker from "faker"

import SearchInput from "../search-input"

const githubSearchInputTestId = "github-search-input"

describe("Search Input component", () => {
  // Common vars to be used between tests
  let mockOnSearch, renderedSearchInput

  // Before each test we populate our rendered and mocked elements to be used at testing
  beforeEach(() => {
    mockOnSearch = jest.fn<void, [string]>()
    renderedSearchInput = render(<SearchInput onSearch={mockOnSearch} />)
  })

  test("Matches snapshot", () => {
    expect(renderedSearchInput.asFragment()).toMatchSnapshot()
  })

  test("Correctly debounce searching", async () => {
    await testDebouncedInput(faker.name.firstName(), mockOnSearch, 0)
    await testDebouncedInput(faker.name.firstName(), mockOnSearch, 1)
  })
})

/**
 * Simulate user input
 * @param value string to input
 */
function dispatchInputEntry(value: string): void {
  fireEvent.input(screen.getByTestId(githubSearchInputTestId), {
    target: { value: value },
  })
}

async function testDebouncedInput(
  search: string,
  onSearchMock: any,
  callIdx: number
): Promise<void> {
  // Dispatch simulation of input
  dispatchInputEntry(search)

  // User should see what he is typing
  expect(screen.getByTestId(githubSearchInputTestId)).toHaveValue(search)

  // No searching has been made yet, waiting for user to stop typing
  expect(onSearchMock.mock.calls[callIdx]).toBeUndefined()
  await new Promise(resolve => setTimeout(resolve, 100))
  expect(onSearchMock.mock.calls[callIdx]).toBeUndefined()

  // "Wait" for user to stop typing
  await new Promise(resolve => setTimeout(resolve, 500))

  // A search should have been made
  expect(onSearchMock.mock.calls[callIdx]).not.toBeUndefined()
  expect(onSearchMock.mock.calls[callIdx][0]).toBe(search)
}
