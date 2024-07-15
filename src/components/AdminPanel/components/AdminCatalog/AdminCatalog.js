import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../redux/slices/CatalogSlice'
import { useDispatch, useSelector } from 'react-redux'
import CatalogListItem from './components/CatalogListItem/CatalogListItem'
import { Link } from 'react-router-dom'
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent'

const AdminCatalog = () => {
  const dispatch = useDispatch()
  const { data: catalogList, loading } = useSelector((state) => state.catalog)
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    dispatch(fetchData({ collectionName: 'en', type: 'calatog' }))
  }, [dispatch, rerender])

  return (
    <div className='text-black'>
      {loading ? <SpinnerComponent /> : null}
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        Catalog Page
      </div>
      <div className='px-5 py-4 w-full overflow-auto h-[95vh]'>
        <section className='flex gap-5 flex-wrap'>
          {catalogList.map((product) => {
            return (
              <CatalogListItem
                key={product.id}
                productData={product}
                setRerender={setRerender}
              />
            )
          })}
          <Link
            to={'add'}
            className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'
          >
            <div className='text-8xl'>+</div>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default AdminCatalog
