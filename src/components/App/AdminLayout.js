import React, { Suspense } from 'react'
import LeftSidebar from '../AdminPanel/components/LeftSidebar/LeftSidebar'
import AdminHeader from '../AdminPanel/components/AdminHeader/AdminHeader'
import AdminSuspenseContent from '../AdminPanel/components/AdminSuspenseContent/AdminSuspenseContent'
import { Route, Routes } from 'react-router-dom'
import { adminRoutes } from '../AdminPanel/components/AdminRoutes/AdminRoutes'
import CatalogItemEditor from '../AdminPanel/components/CatalogItemEditor/CatalogItemEditor'
import BroshuresListEditItem from '../AdminPanel/components/AdminResources/components/BrochuresList/BroshuresListEditItem'
import BrochureAddItem from '../AdminPanel/components/AdminResources/components/BrochuresList/BroshureAddItem'
import ManualsListEditItem from '../AdminPanel/components/AdminResources/components/ManualsList/ManualsListEditItem'
import ManualsAddItem from '../AdminPanel/components/AdminResources/components/ManualsList/ManualsAddItem'
import AdminBlogsAddItem from '../AdminPanel/components/AdminBlogs/components/AdminBlogsAddItem'
import AdminBlogsEditItem from '../AdminPanel/components/AdminBlogs/components/AdminBlogsEditItem'
import CatalogAddItemLayout from '../AdminPanel/components/CatalogItemEditor/components/CatalogAddItemLayout'
import CatalogAddItem from '../AdminPanel/components/CatalogItemEditor/components/CatalogAddItem/CatalogAddItem'

const AdminLayout = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-1/5 h-screen min-w-[280px]'>
        <LeftSidebar />
      </div>
      <div className='drawer-content flex flex-col w-4/5'>
        <AdminHeader />
        <main className=''>
          <Suspense fallback={<AdminSuspenseContent />}>
            <Routes>
              {adminRoutes.map((route, key) => {
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
                path={'catalog/:id'}
                element={<CatalogItemEditor />}
              ></Route>
              <Route path={'catalog/add'} element={<CatalogAddItem />}></Route>
              <Route
                path={'resources/:id'}
                element={<BroshuresListEditItem />}
              ></Route>
              <Route
                path={'resources/brochures/add'}
                element={<BrochureAddItem />}
              ></Route>
              <Route
                path={'resources/manuals/:id'}
                element={<ManualsListEditItem />}
              ></Route>
              <Route
                path={'resources/manuals/add'}
                element={<ManualsAddItem />}
              ></Route>

              <Route path={'blogs/add'} element={<AdminBlogsAddItem />} />
              <Route path={'blogs/:id'} element={<AdminBlogsEditItem />} />

              <Route
                path='*'
                element={
                  <div className='h-[calc(100vh-100px)] w-full flex items-center justify-center'>
                    <div className='hero-content text-accent text-center'>
                      <div className='max-w-md'>
                        <h1 className='text-5xl font-bold'>404 - Not Found</h1>
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
