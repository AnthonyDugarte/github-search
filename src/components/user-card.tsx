import React, { FunctionComponent, useMemo } from "react"
import dompurify from "dompurify"
import { UserData } from "../interfaces"

export interface UserCardProps {
  searchedQuery?: string
  data: UserData
}

const UserCard: FunctionComponent<UserCardProps> = ({
  data,
  searchedQuery,
}) => {
  const { username, avatar_url, profile_url } = data

  const formated_username = useMemo(
    () =>
      !searchedQuery
        ? username
        : username.replace(
            RegExp(`(${searchedQuery})`, "ig"),
            "<span class='text-red-500'>$1</span>"
          ),
    [username, searchedQuery]
  )

  return (
    <a
      className="group
      flex 
      mb-4
      last:mb-0
      bg-white
      rounded-l-full
      rounded-r-full
      border
      border-gray-400

      transition
      duration-500
      ease-in-out
      transform
      hover:-translate-y-1
      hover:scale-110"
      href={profile_url}
      target="_blank"
    >
      <img
        className="rounded-full
        h-16
        w-16
        sm:h-20
        sm:w-20
        lg:h-24
        lg:w-24

        transition
        shadow-sm
        group-hover:shadow-lg"
        src={avatar_url}
        title={username}
      />

      <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-5 flex items-center">
        <div
          className="font-bold text-lg sm:text-xl lg:text-2xl"
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(formated_username, {}),
          }}
        ></div>
      </div>
    </a>
  )
}

export default UserCard
