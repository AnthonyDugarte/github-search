import React from "react"
import { render } from "@testing-library/react"

import UserCard from "../user-card"

describe("User card component", () => {
  test("Matches snapshot with search", () => {
    const { asFragment } = render(
      <UserCard
        search="an"
        data={{ username: "Anthony", avatar_url: "", profile_url: "" }}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test("Matches snapshot without search", () => {
    const { asFragment } = render(
      <UserCard
        data={{ username: "Anthony", avatar_url: "", profile_url: "" }}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
