import React, { FunctionComponent } from "react"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "react-loaders"

import "../css/search-list.scss"

import { UserData } from "../interfaces"
import UserCard from "./user-card"

export interface UserListProps {
  data: UserData[]
  search?: string

  hasMore?: boolean

  fetchNext(): void
}

const UserList: FunctionComponent<UserListProps> = ({
  data,
  search,
  fetchNext,
  hasMore,
}) => (
  <div className="flex-1 m-8">
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchNext}
      initialLoad={false}
      hasMore={hasMore}
      loader={<Loader type="pacman" active key={0} />}
    >
      {data.map(user => (
        <UserCard key={user.id} data={user} search={search} />
      ))}
    </InfiniteScroll>
  </div>
)

UserList.defaultProps = {
  hasMore: false,
}

export default UserList
