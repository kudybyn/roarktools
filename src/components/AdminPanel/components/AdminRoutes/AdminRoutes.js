import { lazy } from 'react'

const AdminCatalog = lazy(() => import('../AdminCatalog/AdminCatalog'))
const AdminBlogs = lazy(() => import('../AdminBlogs/AdminBlogs'))
const AdminResources = lazy(() => import('../AdminResources/AdminResources'))

export const adminRoutes = [
  {
    name: 'Catalog',
    path: 'catalog',
    component: AdminCatalog,
  },
  {
    name: 'Resources',
    path: 'resources',
    component: AdminResources,
  },
  {
    name: 'Blogs',
    path: 'blogs',
    component: AdminBlogs,
  },
]
