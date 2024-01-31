import { sidebarBtns } from "@/lib/constant"
import Link from "next/link"
import React from "react"
import { ModeToggle } from "../ModeToggle"
import { UserButton, auth } from "@clerk/nextjs"
import { title } from "process"

function Sidebar() {
  const user = auth()

  console.log(user)
  return (
    <div className="w-full h-full border dark:border-r-[#3F3F42] flex flex-col py-1">
      <div className="w-auto h-[50px] text-lg border-b dark:border-b-[#3f3f42] flex justify-start items-center px-[1rem]">
        <Link href="/">Discus Gallery Sellers</Link>
      </div>
      <div className="w-full flex flex-col">
        {sidebarBtns.map((btn) => (
          <Link
            href={btn.link}
            className="sidebar-btn border dark:border-b-[#3f3f42]"
            key={title}
          >
            {btn.title}
          </Link>
        ))}
      </div>
      <div className="flex-1"></div>
      <ul className="w-auto flex flex-col justify-around gap-y-4">
        <li>
          <ModeToggle />
        </li>
        <li className="flex justify-start items-center">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: { avatarBox: "h-[30px] w-[30px]" }
            }}
          />
          <h2 className="mx-2">Hello</h2>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
