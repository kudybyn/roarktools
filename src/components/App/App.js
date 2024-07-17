import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Home from '../Home/Home'
import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux'
import { lazy,useEffect } from 'react'
import AdminLayout from './AdminLayout'
import Resourses from 'components/Resourses/Resourses'
import Blog from "../Blog/Blog";
import SimpleBlog from 'components/Blog/SimpleBlog/SimpleBlog'
import Products from "../Products/Products";
import Product from "../Products/Product/Product";
import { useTranslation } from 'react-i18next'

const SingInAdminPage = lazy(() => import('./SingInAdminPage'))

function App() {
  const authAccessToken = useSelector((store) => store.auth.authAccessToken)
  const { i18n } = useTranslation()

  useEffect(()=>{
    if(!i18n.language){
      i18n.changeLanguage('en')
    }
  },[])
  return (
    <div className='font-bold text-bold'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacts' element={<Contact />} />
          <Route path='/resources' element={<Resourses/>}/>
          <Route path='/admin' element={<SingInAdminPage />} />
          <Route path='/admin/*' element={<AdminLayout />} />
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/blog/:id' element={<SimpleBlog/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<Product/>}/>
          <Route
            path='/admin/*'
            element={
              <Navigate to={authAccessToken ? '/admin/catalog' : '/'} replace />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
