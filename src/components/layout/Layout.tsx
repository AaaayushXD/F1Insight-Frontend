import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-f1-black font-inter text-f1-white selection:bg-f1-red selection:text-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
