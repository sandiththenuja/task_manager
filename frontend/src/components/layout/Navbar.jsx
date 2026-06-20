import React, { useState, useEffect, useRef } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setOpenSideMenu(false)
  }, [location])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSideMenu(false)
      }
    }
    
    if (openSideMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSideMenu])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenSideMenu(false)
      }
    }
    
    if (openSideMenu) {
      document.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openSideMenu])

  const toggleMenu = () => {
    setOpenSideMenu(!openSideMenu)
  }

  return (
    <>
      <div className='flex items-center gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 md:px-7 sticky top-0 z-50 shadow-sm'>
        {/* Mobile menu button - only shows on mobile */}
        <button 
          className='block lg:hidden text-gray-700 hover:text-primary transition-colors p-1 rounded-lg hover:bg-gray-100'
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {openSideMenu ? (
            <HiOutlineX className='text-2xl' />
          ) : (
            <HiOutlineMenu className='text-2xl' />
          )}
        </button>

        <h2 className="text-lg font-medium text-gray-800">Task Manager</h2>
      </div>

      {/* Mobile overlay - only shows on mobile */}
      {openSideMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setOpenSideMenu(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Side Menu - only shows when open */}
      {openSideMenu && (
        <div 
          ref={menuRef}
          className="fixed top-0 left-0 h-full z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out translate-x-0 lg:hidden"
        >
          <div className="flex justify-end p-4 border-b">
            <button 
              onClick={() => setOpenSideMenu(false)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <HiOutlineX className="text-2xl" />
            </button>
          </div>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </>
  )
}

export default Navbar