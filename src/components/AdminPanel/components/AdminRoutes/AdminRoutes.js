import { lazy } from 'react'

const AdminCatalog = lazy(() => import('../AdminCatalog/AdminCatalog'))
const AdminBlogs = lazy(() => import('../AdminBlogs/AdminBlogs'))
const AdminResources = lazy(() => import('../AdminResources/AdminResources'))
const AdminManuals = lazy(() => import('../AdminManuals/AdminManuals'))

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
    name: 'Manuals',
    path: 'manuals',
    component: AdminManuals,
  },
  {
    name: 'Blogs',
    path: 'blogs',
    component: AdminBlogs,
  },
]
