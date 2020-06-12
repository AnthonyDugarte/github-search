import React, { FunctionComponent } from "react"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "react-loaders"

import "../css/search-list.scss"

import { UserData } from "../interfaces"
import UserCard from "./user-card"

export interface UserListProps {
  data: UserData[]
  searchedQuery?: string

  hasMore?: boolean

  fetchNext(): void
}

const UserList: FunctionComponent<UserListProps> = ({
  data,
  searchedQuery,
  fetchNext,
  hasMore,
}) => (
  <div className="flex-1 m-2 md:m-4 lg:m-8">
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchNext}
      initialLoad={false}
      hasMore={hasMore}
      loader={
        <div className="mx-10">
          <Loader type="pacman" active key={0} />
        </div>
      }
    >
      {data.map(user => (
        <UserCard key={user.id} data={user} searchedQuery={searchedQuery} />
      ))}
    </InfiniteScroll>
  </div>
)

UserList.defaultProps = {
  hasMore: false,
}

export default UserList
