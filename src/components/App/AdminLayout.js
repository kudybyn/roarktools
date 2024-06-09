import React, { Suspense } from 'react'
import LeftSidebar from '../AdminPanel/components/LeftSidebar/LeftSidebar'
import AdminHeader from '../AdminPanel/components/AdminHeader/AdminHeader'
import AdminSuspenseContent from '../AdminPanel/components/AdminSuspenseContent/AdminSuspenseContent'
import { Route, Routes } from 'react-router-dom'
import { adminRoutes } from '../AdminPanel/components/AdminRoutes/AdminRoutes'

const AdminLayout = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-1/5 h-screen'>
        <LeftSidebar />
      </div>
      <div className='drawer-content flex flex-col w-4/5'>
        <AdminHeader />
        <main className='flex-1 overflow-y-auto md:pt-4 pt-4 px-6'>
          <Suspense fallback={<AdminSuspenseContent />}>
            <Routes>
              {adminRoutes.map((route, key) => {
                console.log('route.component', route.component)
                return (
                  <Route
                    key={key}
                    exact={true}
                    path={`${route.path}`}
                    element={<route.component />}
                  />
                )
              })}
              <Route
                path='*'
                element={
                  <div className='h-[calc(100vh-100px)] w-full flex items-center justify-center'>
                    <div className='hero-content text-accent text-center'>
                      <div className='max-w-md'>
                        <h1 className='text-5xl font-bold'>
                          404 - Not Found dgdgf as
                        </h1>
                      </div>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
