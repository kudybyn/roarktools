import { NavLink, Link, useLocation } from 'react-router-dom'
import LogoImg from '../../../../assets/logo.png'
import { adminRoutes } from '../AdminRoutes/AdminRoutes'
function LeftSidebar() {
  const location = useLocation()

  return (
    <div className='h-screen px-5 py-7 z-30 bg-black flex flex-col items-center'>
      <img
        className='mask mask-squircle h-12'
        src={LogoImg}
        alt='DashWind Logo'
      />
      <ul className='pt-2 w-full px-4 min-h-full text-base-content'>
        {adminRoutes.map((route, k) => {
          return (
            <li
              className='w-full rounded text-xl text-white text-center bg-zinc-800 my-3 hover:bg-opacity-60 hover:text-redColor cursor-pointer transition-all ease-in'
              key={k}
            >
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  `${isActive ? 'text-redColor w-full block px-10 py-1 border-redColor border-b-[2px] ' : 'font-normal block px-10 py-1 border-black border-b-[2px]'} `
                }
              >
                {route.name}
                {location.pathname === route.path ? (
                  <span
                    className='absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                    aria-hidden='true'
                  ></span>
                ) : null}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LeftSidebar
