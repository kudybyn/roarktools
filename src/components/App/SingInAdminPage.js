import LogoImg from '../../assets/logo.png'
import { useState } from 'react'
import { redirect, useNavigate, useRoutes } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setAuthAccessToken } from '../../redux/slices/AuthSlice'

const SingInAdminPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const auth = getAuth()
  const dispatch = useDispatch()

  const singInHandler = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user
        dispatch(setAuthAccessToken(user.accessToken))
        navigate('/admin/catalog')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  const changeUserData = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className='bg-black h-screen'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-320 w-auto'
            src={LogoImg}
            alt='Your Company'
          />
        </div>

        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' action='#' method='POST'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-white'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  onChange={(e) => changeUserData('email', e.target.value)}
                  value={userData.email}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='border-2 border-redColor block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-white'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  onChange={(e) => changeUserData('password', e.target.value)}
                  value={userData.password}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='border-2 border-redColor block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                onClick={(e) => singInHandler(e)}
                type='submit'
                className='flex w-full justify-center rounded-md bg-redColor text-white  px-3 py-1.5 text-base font-semibold leading-6 shadow-sm border border-redColor hover:bg-white hover:text-redColor transition-all ease-in'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SingInAdminPage
