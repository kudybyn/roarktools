import React from 'react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const Footer = ({ menu }) => {
  return (
    <div className='bg-black w-full'>
      <div className='container mx-auto flex flex-col items-center'>
        <ul className='pt-3 flex gap-3 justify-center'>
          {menu.map((linkData,index) => {
            return (
              <li
                key={linkData.title}
                className='text-white text-center font-normal text-base hover:text-redColor w-fit ease-out transition-all'
              >
                <NavLink
                  to={linkData.link}
                  className={({ isActive }) =>
                    `${isActive ? 'text-redColor border-b border-redColor' : ''}`
                  }
                >
                  {linkData.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <div className='group my-3 w-fit'>
          <a
            className='flex group gap-1 items-center text-white font-normal group-hover:text-redColor'
            href='tel:+16104244300'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-phone-call group-hover:stroke-redColor group-hover:scale-125 transition-all ease-out group-hover:animate-tada'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
              <path d='M15 7a2 2 0 0 1 2 2' />
              <path d='M15 3a6 6 0 0 1 6 6' />
            </svg>
            +1 610 424 4300
          </a>
        </div>

        <div className='flex gap-1'>
          <a
            target='_blank'
            href={'https://twitter.com/roark_tools'}
            className={clsx(
              'w-[34px] transition-all hover:scale-110 ease-out cursor-pointer hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-white text-white uppercase font-normal'
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter '
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z' />
            </svg>
          </a>
          <a
            href='https://www.facebook.com/roarktoolsinc/'
            className={clsx(
              'w-[34px] hover:scale-110 transition-all ease-out cursor-pointer group hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-white text-white uppercase font-normal'
            )}
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook '
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
            </svg>
          </a>
        </div>
        <div className='w-full flex container mx-auto items-center justify-between py-5'>
          <div className='flex justify-center w-full'>
            <a href='https://roarktools.com' className='text-white font-light'>
              Copyright 2024 ©{' '}
              <span className='font-bold hover:text-redColor'>Roark Tools</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
