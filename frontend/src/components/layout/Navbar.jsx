import React from 'react'

const Navbar = () => {
  return (
    <div className=''>
        <button className='' onClick={() => {setOpenSideMenu(!openSideMenu)}}>
            {openSideMenu}
        </button>
    </div>
  )
}

export default Navbar