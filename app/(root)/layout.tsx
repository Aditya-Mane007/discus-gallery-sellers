import Navbar from "@/components/shared/Navbar"
import Sidebar from "@/components/shared/Sidebar"
import React from "react"

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <aside className="float-left w-[20%] h-full">
        <Sidebar />
      </aside>
      <main className="w-[100%] ">{children}</main>
    </div>
  )
}

export default layout
