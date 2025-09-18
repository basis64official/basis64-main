import UserProfile from './UserProfile'

import Logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-neutral-900 to-neutral-800 border-b border-neutral-700 dark:bg-neutral-900 dark:border-neutral-700 shadow-md">
      <div className="px-3 py-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center order-1 sm:order-2 p-2 text-sm text-white rounded-lg hover:bg-neutral-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open sidebar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
            <Link to="/" className="flex ms-2 md:me-24 order-2 sm:order-1">
              <img
                src={Logo}
                className="h-12 me-3"
                alt="BASIS-64 Logo"
              />
              <span className="self-center text-lg text-white font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                BASIS-64
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}