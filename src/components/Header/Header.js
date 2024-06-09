import React, { useState } from 'react'
import LogoImg from '../../assets/logo.png'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
const Header = ({ menu }) => {
  const { i18n } = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState(i18n.language)
  const languageList = ['en', 'pt', 'ru', 'ar', 'tr']

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='bg-black fixed w-full z-20'>
      <div className='w-full flex container mx-auto items-center justify-between py-5 px-4 xl:px-5 sm:px-10 laptop:px-6'>
        <div className='flex gap-10 items-center'>
          <img
            src={LogoImg}
            alt={'logo'}
            className='w-[200px] h-[60px]'
            loading='lazy'
          />
          <div className='md:block hidden'>
            <ul className='flex justify-between gap-3'>
              {menu.map((link) => {
                return (
                  <li key={link.title}>
                    <NavLink
                      to={link.link}
                      className={({ isActive }) =>
                        `${isActive ? 'text-redColor border-b border-redColor' : 'text-white'} font-normal text-lg hover:text-redColor ease-out transition-all`
                      }
                    >
                      {link.title}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='laptop:block hidden'>
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
                </div>
              </a>
            </div>
            <div className='flex gap-1'>
              {languageList.map((language, index) => {
                return (
                  <div
                    key={index}
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z' />
                </svg>
              </a>
              <a
                href='https://www.facebook.com/roarktoolsinc/'
                target='_blank'
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
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className='laptop:hidden'>
          <BurgerMenu languageList={languageList} menu={menu} />
        </div>
      </div>
    </div>
  )
}

const BurgerMenu = ({ languageList, menu }) => {
  const { i18n, t } = useTranslation()
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState(i18n.language)
  const [activePage, setActivePage] = useState('home')
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <div
        className='flex gap-2 flex-col'
        onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
      >
        <div className='w-8 h-0.5 bg-white'></div>
        <div className='w-8 h-0.5 bg-white'></div>
        <div className='w-8 h-0.5 bg-white'></div>
      </div>
      {openBurgerMenu && (
        <div
          className={clsx(
            'transition-all ease-in absolute top-0 right-0 h-screen sm:w-7/12 md:w-5/12 w-full bg-black z-50 py-7 flex items-center flex-col px-20'
          )}
        >
          <div className='flex flex-col items-center w-full'>
            <button
              className='absolute top-4 left-4 h-[30px] w-[30px]'
              onClick={() => setOpenBurgerMenu(false)}
            >
              <div className='absolute w-6 h-0.5 bg-white rotate-45' />
              <div className='absolute w-6 h-0.5 bg-white -rotate-45' />
            </button>
            <img
              src={LogoImg}
              alt={'logo'}
              className='md:w-[140px] md:h-[45px] w-[180px] h-[60px]'
            />
            <div className='md:hidden block '>
              <div className='font-normal text-xl text-white text-center mb-2 mt-5'>
                {t('burger-menu.menu')}
              </div>
              <div className='h-[1px] w-full bg-redColor mb-3' />
            </div>

            <div className='md:hidden block'>
              <ul className='flex items-center flex-col gap-2'>
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
            <span className='font-normal text-xl text-white text-center mb-2 mt-5'>
              {t('burger-menu.languages')}
            </span>
            <div className='h-[1px] w-full bg-redColor mb-3' />
            <div className='flex gap-1'>
              {languageList &&
                languageList.map((language, key) => {
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        setActiveLanguage(language)
                        changeLanguage(language)
                        setOpenBurgerMenu(false)
                      }}
                      className={clsx(
                        activeLanguage === language
                          ? 'bg-white text-redColor border-redColor'
                          : 'text-white border-white',
                        'w-[40px] hover:scale-110 transition-all ease-out cursor-pointer hover:bg-white hover:text-redColor hover:border-redColor h-[40px] flex items-center justify-center border  uppercase font-normal'
                      )}
                    >
                      {language}
                    </div>
                  )
                })}
            </div>
            <span className='font-normal text-xl text-white text-center mb-2 mt-5'>
              {t('burger-menu.telephone-number')}
            </span>
            <div className='h-[1px] w-full bg-redColor mb-3' />
            <a
              className='flex items-center  text-white font-normal group-hover:text-redColor ease-out transition-all cursor-pointer'
              href='tel:+16104244300'
            >
              <div className='w-[34px] h-[34px] flex items-center border-white justify-center border group-hover:bg-white group-hover:text-redColor'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-phone-call group-hover:stroke-redColor group-hover:scale-125 transition-all ease-out animate-tada'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
                  <path d='M15 7a2 2 0 0 1 2 2' />
                  <path d='M15 3a6 6 0 0 1 6 6' />
                </svg>
              </div>
              <div className='flex items-center h-[34px] transition-all ease-in px-2 border-white border'>
                +1 610 424 4300
              </div>
            </a>

            <span className='font-normal text-xl text-white text-center mb-2 mt-5'>
              {t('burger-menu.contactUs')}
            </span>
            <div className='h-[1px] w-full bg-redColor mb-3' />

            <div className='flex gap-1'>
              <a
                href={'https://twitter.com/roark_tools'}
                className={clsx(
                  'w-[34px] hover:scale-110 transition-all ease-out group cursor-pointer hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-white text-white uppercase font-normal'
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z' />
                </svg>
              </a>
              <a
                href='https://www.facebook.com/roarktoolsinc/'
                target='_blank'
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
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
      {openBurgerMenu && (
        <div
          className='h-screen w-screen absolute top-0 left-0 overflow-hidden bg-[rgba(0,0,0,0.5)]'
          onClick={() => setOpenBurgerMenu(false)}
        ></div>
      )}
    </div>
  )
}

export default Header
