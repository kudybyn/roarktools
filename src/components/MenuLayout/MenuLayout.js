import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useTranslation } from 'react-i18next'
const MenuLayout = ({ children }) => {
  const { t, i18n } = useTranslation()
  const menuLinks = [
    { title: t('routes.home'), link: '/' },
    { title: t('routes.products'), link: '/products' },
    { title: t('routes.contactsUs'), link: '/contacts' },
    { title: t('routes.resources'), link: '/resources' },
    { title: t('routes.blog'), link: '/blog' },
  ]

  return (
    <div>
      <Header menu={menuLinks} />
      <div>{children}</div>
      <Footer menu={menuLinks} />
    </div>
  )
}

export default MenuLayout
