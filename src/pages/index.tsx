import React, { useState } from "react"
import { PageProps } from "gatsby"

import UserList from "../components/user-list"
import { UserData } from "../interfaces"

export default (props: PageProps) => {
  const [data, setData] = useState<UserData[]>([])

  return (
    <div className="container mx-auto h-screen flex flex-col p-8">
      <h1 className="text-4xl sm:text-6xl md:text-6xl text-red-500">
        GitHub Search
      </h1>

      <UserList data={data} />
    </div>
  )
}
