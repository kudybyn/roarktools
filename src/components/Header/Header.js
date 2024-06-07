import React, { useState } from 'react'
import LogoImg from '../../assets/logo.png'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
const Header = ({ menu }) => {
  const { i18n } = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState('en')
  const [activePage, setActivePage] = useState('home')
  const languageList = ['en', 'pt', 'ru', 'ar', 'tr']

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='bg-black fixed w-full'>
      <div className='w-full flex container mx-auto items-center justify-between py-5 px-5'>
        <div className="flex gap-10 items-center">
        <img src={LogoImg} alt={'logo'} className='w-[220px] h-[60px]' />
        <div>
          <ul className='flex justify-between gap-3'>
            {menu.map((link) => {
              return (
                <li key={link.title}>
                  <a
                    onClick={() => setActivePage(link.title.toLowerCase())}
                    className={clsx(
                      activePage === link.title.toLowerCase()
                        ? 'text-redColor border-b border-redColor'
                        : 'text-white',
                      'font-normal text-lg hover:text-redColor ease-out transition-all'
                    )}
                    href={link.link}
                  >
                    {link.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        </div>
        <div className='flex gap-6'>
          <div className='group'>
            <a
              className='flex items-center  text-white font-normal group-hover:text-redColor ease-out transition-all cursor-pointer'
              href='tel:+16104244300'
            >
              <div className='flex items-center h-[34px] opacity-0 group-hover:opacity-100 transition-all ease-in px-2 border-redColor border'>
                +1 610 424 4300
              </div>
              <div className='w-[34px] h-[34px] flex items-center group-hover:border-redColor justify-center border group-hover:bg-white group-hover:text-redColor'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-phone-call group-hover:stroke-redColor group-hover:scale-125 transition-all ease-out group-hover:animate-tada'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
                  <path d='M15 7a2 2 0 0 1 2 2' />
                  <path d='M15 3a6 6 0 0 1 6 6' />
                </svg>
              </div>
            </a>
          </div>
          <div className='flex gap-6'>
            <div className='flex gap-1'>
              {languageList.map((language) => {
                return (
                  <div
                    onClick={() => {
                      setActiveLanguage(language)
                      changeLanguage(language)
                    }}
                    className={clsx(
                      activeLanguage === language
                        ? 'bg-white text-redColor border-redColor'
                        : 'text-white border-white',
                      'w-[34px] hover:scale-110 transition-all ease-out cursor-pointer hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border  uppercase font-normal'
                    )}
                  >
                    {language}
                  </div>
                )
              })}
            </div>
            <div className='flex gap-1'>
              <a
                href={'https://twitter.com/roark_tools'}
                className={clsx(
                  'w-[34px] hover:scale-110 transition-all ease-out group cursor-pointer hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-white text-white uppercase font-normal'
                )}
                target="_blank"
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z' />
                </svg>
              </a>
              <a
                href='https://www.facebook.com/roarktoolsinc/'
                target="_blank"
                className={clsx(
                  'w-[34px] hover:scale-110 transition-all ease-out cursor-pointer group hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-white text-white uppercase font-normal'
                )}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
