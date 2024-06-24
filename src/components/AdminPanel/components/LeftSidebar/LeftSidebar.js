import { NavLink, useLocation } from 'react-router-dom'
import LogoImg from '../../../../assets/logo.png'
import { adminRoutes } from '../AdminRoutes/AdminRoutes'

function LeftSidebar() {
  const location = useLocation()

  return (
    <div className='h-full px-5 py-7 z-30 bg-black flex flex-col items-center'>
      <img
        className='mask mask-squircle h-12'
        src={LogoImg}
        alt='DashWind Logo'
      />
      <ul className='pt-2 w-full px-4 text-base-content'>
        {adminRoutes.map((route, k) => {
          const linkActive = location.pathname.includes(`/${route.path}`)
          return (
            <li
              className='w-full rounded text-xl text-white text-center bg-zinc-800 my-3 hover:bg-opacity-60 hover:text-redColor cursor-pointer transition-all ease-in'
              key={k}
            >
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  `${isActive || linkActive ? 'text-redColor w-full block px-10 py-1 border-redColor border-b-[2px] ' : 'font-normal block px-10 py-1 border-black border-b-[2px]'} `
                }
              >
                {route.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LeftSidebar
