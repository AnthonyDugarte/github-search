import React, { FunctionComponent } from "react"

import { UserData } from "../interfaces"
import UserCard from "./user-card"

export interface UserListProps {
  data: UserData[]
  search?: string
}

const UserList: FunctionComponent<UserListProps> = ({ data, search }) => (
  <div className="flex-1 m-8">
    {data.map(user => (
      <UserCard key={user.id} data={user} search={search} />
    ))}
  </div>
)

export default UserList
