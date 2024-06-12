import React, { useEffect } from 'react'
import { fetchData } from '../../../../redux/slices/CatalogSlice'
import { useDispatch, useSelector } from 'react-redux'
import CatalogListItem from './components/CatalogListItem/CatalogListItem'

const AdminCatalog = () => {
  const dispatch = useDispatch()
  const catalogList = useSelector((state) => state.catalog.data)

  useEffect(() => {
    dispatch(fetchData({ collectionName: 'en', type: 'calatog' }))
  }, [dispatch])

  const list = [
    ...catalogList,
    ...catalogList,
    ...catalogList,
    ...catalogList,
    ...catalogList,
    ...catalogList,
    ...catalogList,
  ]

  return (
    <div className='text-black'>
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        Catalog Page
      </div>
      <div className='px-5 py-4  flex items-center justify-center w-full'>
        <section className='flex gap-5 flex-wrap justify-around'>
          {list.map((product) => {
            return <CatalogListItem productData={product} />
          })}
        </section>
      </div>
    </div>
  )
}

export default AdminCatalog
