import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LogoImg from '../../assets/logo.png'

const Home = lazy(() => import('../Home/Home'))
const Contact = lazy(() => import('../Contact/Contact'))
const AdminLayout = lazy(() => import('./AdminLayout'))
const Resourses = lazy(() => import('components/Resourses/Resourses'))
const Blog = lazy(() => import('../Blog/Blog'))
const SimpleBlog = lazy(() => import('components/Blog/SimpleBlog/SimpleBlog'))
const Products = lazy(() => import('../Products/Products'))
const Product = lazy(() => import('../Products/Product/Product'))
const SingInAdminPage = lazy(() => import('./SingInAdminPage'))

function App() {
  const authAccessToken = useSelector((store) => store.auth.authAccessToken)

  const { i18n } = useTranslation()
  useEffect(() => {
    const handleLanguageChange = () => {
      i18n.reloadResources()
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  return (
    <div className='font-bold text-bold'>
      <Router>
        <Suspense
          fallback={
            <div className='h-screen w-full flex justify-center items-center'>
              <div className='flex flex-col gap-6 items-center'>
                <div
                  className='inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-redColor border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
                ></div>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contacts' element={<Contact />} />
            <Route path='/resources' element={<Resourses />} />
            <Route path='/admin' element={<SingInAdminPage />} />
            <Route path='/admin/*' element={<AdminLayout />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:id' element={<SimpleBlog />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<Product />} />
            <Route
              path='/admin/*'
              element={
                <Navigate
                  to={authAccessToken ? '/admin/catalog' : '/'}
                  replace
                />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
