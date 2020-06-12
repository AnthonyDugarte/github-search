import React, {
  useState,
  useLayoutEffect,
  useReducer,
  Reducer,
  useMemo,
  useCallback,
} from "react"
import { PageProps } from "gatsby"
import useSWR from "swr"
import { FaGithub } from "react-icons/fa"

import SearchInput from "../components/search-input"
import UserList from "../components/user-list"
import Seo from "../components/seo"

import { UserData } from "../interfaces"
import { githubUsersPaginatedDataSearchFetcher } from "../utils"

const pageSize = 75

export default (props: PageProps) => {
  const [search, setSearch] = useState<string>(null)
  const [data, setData] = useReducer(userDataReducer, [])
  const [page, dispatchPage] = useReducer(pageReducer, 1)

  // When our search changes, we must change our results and reset our pager
  // (it needs to be done before we trigget a data fetching)
  useLayoutEffect(() => {
    dispatchPage({ type: "reset" })
    setData({ type: "reset" })
  }, [search])

  const { data: _data, error, isValidating } = useSWR(
    search ? [search, page, pageSize] : null,
    githubUsersPaginatedDataSearchFetcher
  )

  const hasMoreToLoad = useMemo(
    () =>
      isValidating ||
      !!(
        _data?.total_count &&
        data.length &&
        data.length !== _data?.total_count
      ),
    [_data, data, isValidating]
  )

  const nextPage = useCallback(
    () =>
      dispatchPage({
        type: "set",
        page: Math.floor(data.length / pageSize) + 1,
      }),
    [data]
  )

  useLayoutEffect(() => {
    // Add data when items array is not empty
    if (_data?.items?.length) {
      setData({
        type: "add",

        // Response data itself is not a valid UserData element
        payload: _data.items.map(({ id, login, avatar_url, html_url }) => ({
          id,
          username: login,
          avatar_url,
          profile_url: `${html_url}?tab=repositories`,
        })),
      })
    }
  }, [_data])

  return (
    <div className="container mx-auto h-screen flex flex-col p-2 md:p-4 lg:p-8">
      <Seo />

      <nav className="flex items-center justify-between flex-wrap">
        <span className="text-4xl sm:text-6xl md:text-6xl text-red-500">
          GitHub Search
        </span>

        <a
          className="-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-gray-400 rounded shadow"
          href="https://github.com/AnthonyDugarte/github-search"
          target="_blank"
        >
          <FaGithub size={25} />
        </a>
      </nav>

      <SearchInput onSearch={setSearch} />
      <UserList
        data={data}
        search={search}
        fetchNext={nextPage}
        hasMore={hasMoreToLoad}
      />
    </div>
  )
}

const userDataReducer: Reducer<
  UserData[],
  { type: "add"; payload: UserData[] } | { type: "reset" }
> = (data, action) => {
  if (action.type === "reset") return []

  const _data = data.concat(action.payload)

  // save first index appearance of ids in order to secure no repeated elements are send
  const idPos = {}
  _data.forEach((item, idx) => {
    idPos[item.id] = idPos[item.id] ?? idx
  })

  return _data.filter((item, idx) => idPos[item.id] === idx)
}

const pageReducer: Reducer<
  number,
  { type: "next" } | { type: "reset" } | { type: "set"; page: number }
> = (page, action) => {
  switch (action.type) {
    case "reset":
      return 1
    case "next":
      return page + 1
    case "set":
      return action.page
    default:
      return page
  }
}
