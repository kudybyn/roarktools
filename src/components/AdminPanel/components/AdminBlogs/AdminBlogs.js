import React from 'react'
import AdminBlogsList from './components/AdminBlogsList'

const AdminBlogs = () => {
  return (
    <div className='text-black'>
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        Blog Page
      </div>
      <section>
        <AdminBlogsList />
      </section>
    </div>
  )
}

export default AdminBlogs
