import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Home from '../Home/Home'
import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux'
import { lazy } from 'react'
import AdminLayout from './AdminLayout'

const SingInAdminPage = lazy(() => import('./SingInAdminPage'))

function App() {
  const authAccessToken = useSelector((store) => store.auth.authAccessToken)

  console.log('authAccessToken', authAccessToken)
  return (
    <div className='font-bold text-bold'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacts' element={<Contact />} />
          <Route path='/admin' element={<SingInAdminPage />} />
          <Route path='/admin/*' element={<AdminLayout />} />
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
