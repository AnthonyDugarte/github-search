import React, { FunctionComponent } from "react"
import InfiniteScroll from "react-infinite-scroller"

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
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
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
