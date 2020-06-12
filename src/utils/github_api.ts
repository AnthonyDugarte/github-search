import { githubAPI } from "./axios"

export async function githubPaginatedDataSearchFetcher<T>(
  url: string,
  q: string,
  page?: number,
  per_page?: number
): Promise<T> {
  const { data } = await githubAPI.get<T>(url, {
    params: {
      q,
      page,
      per_page,
    },
  })

  return data
}

export function githubUsersPaginatedDataSearchFetcher(
  q: string,
  page?: number,
  per_page?: number
): Promise<GitHubSearchUserAPIResponse> {
  return githubPaginatedDataSearchFetcher<GitHubSearchUserAPIResponse>(
    `/search/users`,
    q,
    page,
    per_page
  )
}

interface GitHubSearchUserAPIResponse {
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
