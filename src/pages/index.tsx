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

import SearchInput from "../components/search-input"
import UserList from "../components/user-list"
import Seo from "../components/seo"

import { UserData } from "../interfaces"
import { githubAPI } from "../utils"

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
    search ? [`/search/users`, search, page, pageSize] : null,
    userDataFetcher
  )

  const loading = useMemo(() => !_data && isValidating, [_data, isValidating])

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
          profile_url: html_url,
        })),
      })
    }
  }, [_data])

  return (
    <div className="container mx-auto h-screen flex flex-col p-8">
      <Seo />

      <h1 className="text-4xl sm:text-6xl md:text-6xl text-red-500">
        GitHub Search
      </h1>

      <SearchInput onSearch={setSearch} />
      <UserList
        data={data}
        search={search}
        fetchNext={nextPage}
        hasMore={
          isValidating ||
          !!(
            _data?.total_count &&
            data.length &&
            data.length !== _data?.total_count
          )
        }
      />
    </div>
  )
}

async function userDataFetcher(
  url: string,
  q: string,
  page: number,
  per_page: number
): Promise<GitHubAPIResposne> {
  const { data } = await githubAPI.get<GitHubAPIResposne>(url, {
    params: { q, page, per_page },
  })

  return data
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
  if (action.type === "reset") return 1
  if (action.type === "next") return page + 1
  if (action.type === "set") return action.page

  return page
}

interface GitHubAPIResposne {
  incomplete_results: boolean
  total_count: number
  items: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    score: number
    text_matches?: {
      object_url: string
      object_type: string
      property: string
      fragment: string
      matches: [{ text: string; indices: [number, number] }]
    }[]
  }[]
}
