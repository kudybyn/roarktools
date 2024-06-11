import React from 'react'
import { Link } from 'react-router-dom'

const CatalogListItem = ({ productData }) => {
  return (
    <div className='card shadow w-fit p-4 rounded-xl border'>
      <img
        alt={productData.title}
        src={productData.images[0].link}
        className='object-cover max-w-[200px] max-h-[200px] h-auto w-auto'
      />
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
