import React, { FunctionComponent, useMemo } from "react"
import dompurify from "dompurify"
import { UserData } from "../interfaces"

export interface UserCardProps {
  search?: string
  data: UserData
}

const UserCard: FunctionComponent<UserCardProps> = ({ data, search }) => {
  const { username, avatar_url, profile_url } = data

  const formated_username = useMemo(
    () =>
      !search
        ? username
        : username.replace(
            RegExp(`(${search})`, "ig"),
            "<span class='text-red-500'>$1</span>"
          ),
    [username, search]
  )

  return (
    <a
      className="group flex mb-4 last:mb-0 bg-white rounded-l-full rounded-r-full border border-gray-400 hover:outline-none hover:shadow-outline"
      href={profile_url}
      target="_blank"
    >
      <img
        className="rounded-full h-24 w-24 group-hover:outline-none group-hover:shadow-lg shadow-sm"
        src={avatar_url}
        title={username}
      />

      <div className="flex-1 p-4">
        <div
          className="font-bold text-xl"
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(formated_username, {}),
          }}
        ></div>
      </div>
    </a>
  )
}

export default UserCard
