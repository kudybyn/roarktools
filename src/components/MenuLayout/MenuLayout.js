import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
const MenuLayout = ({ children }) => {
  const menuLinks = [
    { title: 'Home', link: '/' },
    { title: 'Products', link: '/products' },
    { title: 'Contacts Us', link: '/contacts-us' },
    { title: 'Resources', link: '/resources' },
    { title: 'Blog', link: '/blog' },
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
