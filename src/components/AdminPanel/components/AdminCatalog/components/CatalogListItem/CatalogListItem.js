import React from 'react'
import { Link } from 'react-router-dom'

const CatalogListItem = ({ productData }) => {
  return (
    <div className='card shadow p-4 rounded-xl border h-[300px] w-[300px] items-center flex flex-col'>
      <div className='h-[180px] w-[300px] flex items-center justify-center'>
        <img
          alt={productData.title}
          src={productData.images[0].link}
          className='object-cover max-w-[300px] max-h-[180px] h-auto w-auto'
        />
      </div>
      <div className='my-3 '>{productData.title}</div>
      <Link
        to={`${productData.id}`}
        className='w-full flex items-center justify-center rounded-md bg-redColor py-1 text-white hover:text-black hover:bg-white hover:border hover:border-redColor border border-transparent transition-all ease-in'
      >
        Change Product
      </Link>
    </div>
  )
}

export default CatalogListItem
